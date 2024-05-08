// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBlyWZT3UJojrQawPNOhrGAevzn1wou0Lk",
  authDomain: "pedidos-d16d7.firebaseapp.com",
  projectId: "pedidos-d16d7",
  storageBucket: "pedidos-d16d7.appspot.com",
  messagingSenderId: "37307721820",
  appId: "1:37307721820:web:56fd148180b9eba84b1e99",
  measurementId: "G-WZY084GFTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dbFirebase = getFirestore(app);