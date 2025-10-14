import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase.config';

export const saveEmail = async (email: string) => {
  try {
    // check if email already exists
    const q = query(collection(db, 'email'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      console.log('Email already exists');
      return { success: true, message: 'Email already registered' };
    }
    
    // save new email
    const docRef = await addDoc(collection(db, 'email'), {
      email: email,
      timestamp: serverTimestamp(),
    });
    
    console.log('Email saved with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving email:', error);
    return { success: false, error };
  }
};