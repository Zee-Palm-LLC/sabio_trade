import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase.config';

export const saveEmail = async (
  email: string,
  attemptedQuestions: Record<
    string,
    { answer: string; icon?: string }
  > = {}
) => {
  try {
    const sanitizedEmail = email?.trim().toLowerCase();

    if (!sanitizedEmail || typeof sanitizedEmail !== 'string' || !sanitizedEmail.includes('@')) {
      return { success: false, error: 'Invalid email format' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return { success: false, error: 'Invalid email format' };
    }

    const emailDocRef = doc(db, 'email', sanitizedEmail);
    const existingDoc = await getDoc(emailDocRef);

    if (existingDoc.exists()) {
      // Email exists → merge attemptedQuestions with existing ones
      const existingData = existingDoc.data();
      const existingAttemptedQuestions = existingData?.attemptedQuestions || {};
      
      // Merge new attemptedQuestions with existing ones (new answers override old ones for same questions)
      // Questions are keys, so merging by question text ensures all questions are preserved
      const mergedAttemptedQuestions = {
        ...existingAttemptedQuestions,
        ...attemptedQuestions,
      };
      
      await setDoc(
        emailDocRef,
        {
          email: sanitizedEmail,
          attemptedQuestions: mergedAttemptedQuestions,
          timestamp: serverTimestamp(),
        },
        { merge: true } // ensures we don't wipe unrelated fields if added later
      );

      return { success: true, message: 'Answers updated for existing email' };
    } else {
      // New email → create document
      await setDoc(emailDocRef, {
        email: sanitizedEmail,
        attemptedQuestions,
        timestamp: serverTimestamp(),
      });

      return { success: true, id: sanitizedEmail, message: 'Email registered successfully' };
    }
  } catch (error: any) {
    let errorMessage = 'Failed to save data';
    if (error.code === 'permission-denied') {
      errorMessage = 'Unable to save email. Please contact support.';
    } else if (error.code === 'unavailable') {
      errorMessage = 'Service temporarily unavailable. Please try again.';
    } else if (error.code === 'failed-precondition') {
      errorMessage = 'Service not ready. Please try again.';
    }

    return { success: false, error: errorMessage };
  }
};
