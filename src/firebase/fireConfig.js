//Skrevet av: Oscar
import { initializeApp } from "firebase/app";
import { getFirestore, collection, where, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//Kobler til firebase gjennom API
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
//Referanse til databasen
export const db = getFirestore();
//Referanse til collection Kalender
export const dbKalender = collection(db, "Kalender");
//Referanse til collection Config
export const dbConfig = collection(db, "Config");
//Autentiserings variabel som brukes i diverse firebase metoder;
export const autentisering = getAuth(app);
