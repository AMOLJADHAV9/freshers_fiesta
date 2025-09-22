// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_idh9mxQQL7OpdQ9hTC6C00h7z8NUiOk",
  authDomain: "registration-261d5.firebaseapp.com",
  projectId: "registration-261d5",
  storageBucket: "registration-261d5.firebasestorage.app",
  messagingSenderId: "110091165434",
  appId: "1:110091165434:web:9082ad267496aa98f2f343",
  measurementId: "G-PNF317H99E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;