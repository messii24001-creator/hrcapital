import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmbNc9M0WsB0Fg1Vh8TofGQQRiPdDM-Jg",
  authDomain: "hr-capital-7d2ad.firebaseapp.com",
  projectId: "hr-capital-7d2ad",
  storageBucket: "hr-capital-7d2ad.firebasestorage.app",
  messagingSenderId: "1075074139027",
  appId: "1:1075074139027:web:2ca2bc09d89369116d1e66"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  query,
  where,
};