// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCht0gly6Xc849cSJutxWtDYVwMvtafRKU",
  authDomain: "ai-trip-planner-44880.firebaseapp.com",
  projectId: "ai-trip-planner-44880",
  storageBucket: "ai-trip-planner-44880.firebasestorage.app",
  messagingSenderId: "1078174746619",
  appId: "1:1078174746619:web:7a80ff7e425b81bc0fed5e"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);