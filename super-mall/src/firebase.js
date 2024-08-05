// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGT7S12b9uM7jn6zGZpSG58cyAEy1K3kU",
  authDomain: "super-mall-b16a6.firebaseapp.com",
  projectId: "super-mall-b16a6",
  storageBucket: "super-mall-b16a6.appspot.com",
  messagingSenderId: "948399811001",
  appId: "1:948399811001:web:4d679e9301b5216dc0ee68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
