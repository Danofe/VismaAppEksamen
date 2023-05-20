import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCPDnaH0H3zr1WOP6mtTH21DoLE_8__7PI",
  authDomain: "kalendervisma.firebaseapp.com",
  projectId: "kalendervisma",
  storageBucket: "kalendervisma.appspot.com",
  messagingSenderId: "446057597972",
  appId: "1:446057597972:web:c1a4ad6b013cb3acc7eb01",
  measurementId: "G-E4LFYJWHXZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const dbKalender = collection(db, "Kalender");
export const dbConfig = collection(db,"Config");
export const dbTest = collection(db,"Test");
export const autentisering = getAuth(app);
//Skrevet av: Oscar