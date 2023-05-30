import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
require("dotenv").config();
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MES_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const dbKalender = collection(db, "Kalender");
export const dbConfig = collection(db, "Config");
export const dbTest = collection(db, "Test");
export const autentisering = getAuth(app);
//Skrevet av: Oscar
