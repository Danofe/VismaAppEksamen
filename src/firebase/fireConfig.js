import { initializeApp } from "firebase/app";
import { getFirestore, collection, where, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MES_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const dbKalender = collection(db, "Kalender");
export const dbConfig = collection(db, "Config");
export const dbTest = collection(db, "Test");
export const autentisering = getAuth(app);
//Skrevet av: Oscar
