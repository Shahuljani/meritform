// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your config (already correct 👍)
const firebaseConfig = {
  apiKey: "AIzaSyAjrn0etd94unqvZTDkOiMbj0bQVbMKwTE",
  authDomain: "meritbasedadmissions.firebaseapp.com",
  projectId: "meritbasedadmissions",
  storageBucket: "meritbasedadmissions.firebasestorage.app",
  messagingSenderId: "152604951061",
  appId: "1:152604951061:web:4b46f2ca817325ae51841c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ ADD THIS (very important)
export const db = getFirestore(app);