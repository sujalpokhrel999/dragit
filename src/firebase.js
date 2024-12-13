// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKM2Y3X9d7cB1ub5UtqvPyQPhpeFBxXOw",
  authDomain: "dragit-75e32.firebaseapp.com",
  projectId: "dragit-75e32",
  storageBucket: "dragit-75e32.firebasestorage.app",
  messagingSenderId: "753462296811",
  appId: "1:753462296811:web:67817db589ea13e3f57eae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, collection, getDocs, addDoc, updateDoc, doc, deleteDoc}