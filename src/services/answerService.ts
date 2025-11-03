// Answer Service - Centralized in-memory state management for quiz answers
// Note: Answers are stored in-memory during the session and persisted to Firestore when email is submitted

export interface AnswerData {
    questionId: number;
    questionText: string;
    answer: string;
}

// In-memory storage (clears on page refresh)
// Keyed by questionId for quick lookup, but includes question text
// Note: Multiple questions can have the same ID (from different quiz files),
// so we store them and use question text as the unique identifier when saving to Firestore
let answersStorage: Record<number, AnswerData> = {};

// Also maintain a map by question text to handle ID conflicts
// This allows us to store all questions even if IDs overlap
let answersByQuestionText: Record<string, AnswerData> = {};

// Event listeners for answer changes
const listeners: Set<() => void> = new Set();

export class AnswerService {
    // Store an answer for a specific question with question text
    static storeAnswer(questionId: number, questionText: string, answer: string): void {
        console.log('AnswerService.storeAnswer called with:', { questionId, questionText, answer });

        const answerData: AnswerData = {
            questionId,
            questionText,
            answer
        };

        // Store by questionId (for quick lookup during quiz)
        // Note: If IDs conflict, the last one stored wins here, but we also store by question text
        answersStorage[questionId] = answerData;
        
        // Also store by question text (to handle ID conflicts - same ID from different quiz files)
        // This ensures we don't lose answers even if question IDs overlap
        answersByQuestionText[questionText] = answerData;
        
        console.log(`Stored answer for question ${questionId} (${questionText}):`, answer);
        console.log('Updated answers by ID:', answersStorage);
        console.log('Updated answers by question text:', answersByQuestionText);
        
        // Notify all listeners that answers have changed
        listeners.forEach(listener => listener());
    }

    // Get answer for a specific question
    static getAnswer(questionId: number): string | null {
        return answersStorage[questionId]?.answer || null;
    }

    // Get answer data for a specific question
    static getAnswerData(questionId: number): AnswerData | null {
        return answersStorage[questionId] || null;
    }

    // Get all answers (returns AnswerData objects)
    static getAllAnswers(): Record<number, AnswerData> {
        return { ...answersStorage };
    }
    
    // Get all answers as a map of question text -> answer (for Firestore storage)
    // This uses the question text map to ensure we get ALL answers even if IDs conflict
    static getAllAnswersByQuestionText(): Record<string, { answer: string }> {
        const result: Record<string, { answer: string }> = {};
        Object.values(answersByQuestionText).forEach(data => {
            result[data.questionText] = { answer: data.answer };
        });
        return result;
    }

    // Clear answer for a specific question
    static clearAnswer(questionId: number): void {
        const answerData = answersStorage[questionId];
        if (answerData) {
            delete answersStorage[questionId];
            // Also remove from question text map
            delete answersByQuestionText[answerData.questionText];
        }
        
        // Notify all listeners
        listeners.forEach(listener => listener());
    }

    // Clear all answers
    static clearAnswers(): void {
        answersStorage = {};
        answersByQuestionText = {};
        console.log('Cleared all answers');
        
        // Notify all listeners
        listeners.forEach(listener => listener());
    }

    // Subscribe to answer changes
    static subscribeToChanges(callback: () => void): () => void {
        listeners.add(callback);
        console.log('Subscribed to answer changes. Total listeners:', listeners.size);

        // Return unsubscribe function
        return () => {
            listeners.delete(callback);
            console.log('Unsubscribed from answer changes. Total listeners:', listeners.size);
        };
    }

    // Debug method to log current state
    static debugAnswers(): void {
        const answers = this.getAllAnswers();
        console.log('Current Answers:', answers);
    }
}

