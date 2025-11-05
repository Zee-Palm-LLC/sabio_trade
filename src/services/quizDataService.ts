// Quiz Data Service - Stores quiz answers with batching for performance
// Stores locally first, then batches writes to Firestore

import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { DNAIconsService } from './dnaIconsService';

interface PendingAnswer {
  questionId: number;
  questionText: string;
  answer: string;
}

export class QuizDataService {
  // In-memory storage for pending writes
  private static pendingAnswers: Map<string, Map<string, PendingAnswer>> = new Map();
  private static syncTimeouts: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private static readonly SYNC_DELAY_MS = 500; // Debounce delay for batching writes

  // Store answer in memory queue/cache, then queue for batched sync
  // This is non-blocking and doesn't wait for database write
  static storeAnswer(
    sessionId: string,
    questionId: number,
    questionText: string,
    answer: string
  ): void {
    // Store in memory queue (this serves as both queue and cache)
    if (!this.pendingAnswers.has(sessionId)) {
      this.pendingAnswers.set(sessionId, new Map());
    }
    
    const sessionQueue = this.pendingAnswers.get(sessionId)!;
    sessionQueue.set(questionText, {
      questionId,
      questionText,
      answer
    });

    // Debounce the sync - reset timer on each call
    const existingTimeout = this.syncTimeouts.get(sessionId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    const timeout = setTimeout(() => {
      this.syncTimeouts.delete(sessionId);
      this.syncAnswersToFirestore(sessionId);
    }, this.SYNC_DELAY_MS);
    
    this.syncTimeouts.set(sessionId, timeout);

    console.log(`Queued answer for question "${questionText}" in session ${sessionId}`);
  }

  // Sync all pending answers to Firestore in a single batch
  // Note: Queue is kept intact as cache after sync - answers remain available for UI
  private static async syncAnswersToFirestore(sessionId: string): Promise<void> {
    const sessionQueue = this.pendingAnswers.get(sessionId);
    if (!sessionQueue || sessionQueue.size === 0) {
      return;
    }

    try {
      const sessionDocRef = doc(db, 'quiz_sessions', sessionId);
      const existingDoc = await getDoc(sessionDocRef);

      // Prepare new answers data
      const newAnswers: Record<string, any> = {};
      sessionQueue.forEach((answerData) => {
        newAnswers[answerData.questionText] = {
          questionId: answerData.questionId,
          questionText: answerData.questionText,
          answer: answerData.answer,
          timestamp: serverTimestamp()
        };
      });

      if (existingDoc.exists()) {
        // Get existing answers and merge with new ones
        const existingData = existingDoc.data();
        const existingAnswers = existingData.answers || {};
        
        // Update existing session with merged answers
        await updateDoc(sessionDocRef, {
          answers: {
            ...existingAnswers,
            ...newAnswers
          },
          lastUpdated: serverTimestamp()
        });
      } else {
        // Create new session with all answers
        await setDoc(sessionDocRef, {
          sessionId,
          answers: newAnswers,
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        });
      }

      // Keep the queue intact - it serves as cache for UI access
      // Answers remain available for highlighting even after sync
      console.log(`Synced ${Object.keys(newAnswers).length} answers to Firestore for session ${sessionId}`);
    } catch (error) {
      console.error('Error syncing answers to Firestore:', error);
      // Don't clear queue on error - will retry on next sync
    }
  }

  // Force immediate sync of all pending answers (use before critical operations)
  static async syncAllAnswers(sessionId: string): Promise<void> {
    // Clear any pending timeout for this session
    const existingTimeout = this.syncTimeouts.get(sessionId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      this.syncTimeouts.delete(sessionId);
    }

    // Perform sync (queue remains as cache after sync)
    await this.syncAnswersToFirestore(sessionId);
  }

  // Collect all answers from a session and format for email document
  // Ensures all pending answers are synced before collecting
  static async collectAnswersForEmail(sessionId: string): Promise<Record<string, { answer: string; icon?: string }>> {
    try {
      // First, ensure all pending answers are synced
      await this.syncAllAnswers(sessionId);

      const sessionDocRef = doc(db, 'quiz_sessions', sessionId);
      const sessionDoc = await getDoc(sessionDocRef);
      
      if (!sessionDoc.exists()) {
        console.log('No session found, returning empty answers');
        return {};
      }
      
      const sessionData = sessionDoc.data();
      const answers = sessionData.answers || {};
      
      // Get all DNA icons
      const allDNAIcons = DNAIconsService.getDNAIcons();
      
      // Transform to format: question text -> { answer, icon? }
      const attemptedQuestions: Record<string, { answer: string; icon?: string }> = {};
      
      Object.values(answers).forEach((answerData: any) => {
        const questionText = answerData.questionText;
        const questionId = answerData.questionId;
        
        // Find corresponding DNA icon
        const dnaIcon = allDNAIcons.find(icon => icon.questionId === questionId);
        
        attemptedQuestions[questionText] = {
          answer: answerData.answer,
          ...(dnaIcon && { icon: dnaIcon.icon })
        };
      });
      
      return attemptedQuestions;
    } catch (error) {
      console.error('Error collecting answers:', error);
      return {};
    }
  }

  // Generate or get session ID from sessionStorage (temporary, cleared on close)
  static getSessionId(): string {
    if (typeof window === 'undefined') return 'default';
    
    let sessionId = sessionStorage.getItem('quiz_session_id');
    if (!sessionId) {
      sessionId = `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('quiz_session_id', sessionId);
    }
    return sessionId;
  }

  // Get stored answer for a specific question from in-memory queue/cache
  static getStoredAnswer(sessionId: string, questionText: string): string | null {
    const sessionQueue = this.pendingAnswers.get(sessionId);
    if (sessionQueue) {
      const pendingAnswer = sessionQueue.get(questionText);
      if (pendingAnswer) {
        return pendingAnswer.answer;
      }
    }
    return null;
  }

  // Get stored answer by question ID from in-memory queue/cache
  static getStoredAnswerByQuestionId(sessionId: string, questionId: number): string | null {
    const sessionQueue = this.pendingAnswers.get(sessionId);
    if (sessionQueue) {
      for (const [_, answerData] of sessionQueue) {
        if (answerData.questionId === questionId) {
          return answerData.answer;
        }
      }
    }
    return null;
  }

  // Clear session ID (optional, for cleanup)
  static clearSessionId(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('quiz_session_id');
    }
  }
}

