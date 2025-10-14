import { initializeApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnhH_3HzJIo3ixoTuBaxD_JhBjyZQ_l_M",
  authDomain: "sabiotrade-d5da1.firebaseapp.com",
  projectId: "sabiotrade-d5da1",
  storageBucket: "sabiotrade-d5da1.firebasestorage.app",
  messagingSenderId: "602647395393",
  appId: "1:602647395393:web:75713647c1fc406651dac0",
  measurementId: "G-4SGNCQ2Q43"
};

const app = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const db: Firestore = getFirestore(app);

export { db, analytics };