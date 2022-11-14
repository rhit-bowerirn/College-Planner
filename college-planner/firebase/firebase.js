import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  updateDoc,
  setDoc,
  limit,
  arrayRemove,
  arrayUnion
} from "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PRODUCT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(clientCredentials);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const signIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return signOut(auth);
};

export {
  db,
  collection,
  query,
  where,
  limit,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  auth,
  onAuthStateChanged,
  signIn,
  signUp,
  logout,
};
