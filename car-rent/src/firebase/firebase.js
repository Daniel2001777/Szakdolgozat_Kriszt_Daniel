// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWmLldbQKxC07ogr7sfTo1hNBUD29ibCw",
  authDomain: "car-rent-db7a4.firebaseapp.com",
  projectId: "car-rent-db7a4",
  storageBucket: "car-rent-db7a4.appspot.com",
  messagingSenderId: "927934296566",
  appId: "1:927934296566:web:92f101bfdf880c166097d7",
  measurementId: "G-NPRCNSNGQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);