import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword , updateProfile , signInWithEmailAndPassword , onAuthStateChanged , signOut , sendPasswordResetEmail , signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { getFirestore , addDoc, collection , getDocs , getDoc , query, where , doc, updateDoc,setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEIXAyL0j0m9gMJny_YOwEAPu1158FjqE",
  authDomain: "codenetic-blood-bank.firebaseapp.com",
  projectId: "codenetic-blood-bank",
  storageBucket: "codenetic-blood-bank.firebasestorage.app",
  messagingSenderId: "1033056151472",
  appId: "1:1033056151472:web:d0a3c1f3d67c8a3c0a9875",
  measurementId: "G-RGHBG8ZF4G"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// Initialize Authentication
const auth = getAuth();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();
const provider = new GoogleAuthProvider();


export { auth, createUserWithEmailAndPassword , updateProfile , signInWithEmailAndPassword , onAuthStateChanged , db , addDoc , collection , signOut , getDocs , getDoc , query , where , doc, updateDoc, setDoc , sendPasswordResetEmail , signInWithPopup , provider , GoogleAuthProvider };