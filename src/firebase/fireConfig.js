import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZTTV_0zmetjc9MDAusZkkv_WmK9KEz8E",
  authDomain: "vismayo-cfb15.firebaseapp.com",
  databaseURL:
    "https://vismayo-cfb15-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "vismayo-cfb15",
  storageBucket: "vismayo-cfb15.appspot.com",
  messagingSenderId: "460034540860",
  appId: "1:460034540860:web:1625f50b547f5f97e40a39",
  measurementId: "G-9TJ5J7LX11",
};

initializeApp(firebaseConfig);
const db = getFirestore();
export const dbcol = collection(db, "KalenderTest");
//Skrevet av: Oskar
