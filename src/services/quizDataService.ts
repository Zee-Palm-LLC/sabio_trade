// Quiz Data Service - Stores quiz answers directly in Firestore
// No localStorage, all data goes directly to database

import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { DNAIconsService } from './dnaIconsService';

export class QuizDataService {
  // Store a single answer directly to Firestore
  // Uses sessionId to group answers before email is provided
  static async storeAnswer(
    sessionId: string,
    questionId: number,
    questionText: string,
    answer: string
  ): Promise<void> {
    try {
      const sessionDocRef = doc(db, 'quiz_sessions', sessionId);
      
      // Get existing document or create new
      const existingDoc = await getDoc(sessionDocRef);
      
      const answerData = {
        questionId,
        questionText,
        answer,
        timestamp: serverTimestamp()
      };
      
      if (existingDoc.exists()) {
        // Update existing session
        await updateDoc(sessionDocRef, {
          [`answers.${questionText}`]: answerData,
          lastUpdated: serverTimestamp()
        });
      } else {
        // Create new session
        await setDoc(sessionDocRef, {
          sessionId,
          answers: {
            [questionText]: answerData
          },
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        });
      }
      
      console.log(`Stored answer for question "${questionText}" in session ${sessionId}`);
    } catch (error) {
      console.error('Error storing answer to Firestore:', error);
      throw error;
    }
  }

  // Collect all answers from a session and format for email document
  static async collectAnswersForEmail(sessionId: string): Promise<Record<string, { answer: string; icon?: string }>> {
    try {
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

  // Clear session ID (optional, for cleanup)
  static clearSessionId(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('quiz_session_id');
    }
  }
}

