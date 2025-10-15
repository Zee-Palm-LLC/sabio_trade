import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase.config';

export const saveEmail = async (email: string) => {
    try {
        const sanitizedEmail = email?.trim().toLowerCase();
        
        if (!sanitizedEmail || typeof sanitizedEmail !== 'string' || !sanitizedEmail.includes('@')) {
            return { success: false, error: 'Invalid email format' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sanitizedEmail)) {
            return { success: false, error: 'Invalid email format' };
        }

        const q = query(collection(db, 'email'), where('email', '==', sanitizedEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return { success: true, message: 'Email already registered' };
        }
        
        const docRef = await addDoc(collection(db, 'email'), {
            email: sanitizedEmail,
            timestamp: serverTimestamp(),
        });
        
        return { success: true, id: docRef.id, message: 'Email registered successfully' };
    } catch (error: any) {
        let errorMessage = 'Failed to register email';
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