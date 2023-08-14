import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAtlrRVyKquPbwORDGww3_dPVcg5VGI6HI",
  authDomain: "fir-f9dbf.firebaseapp.com",
  projectId: "fir-f9dbf",
  storageBucket: "fir-f9dbf.appspot.com",
  messagingSenderId: "532966434585",
  appId: "1:532966434585:web:4c0a126841f28ddc4d8788",
  measurementId: "G-95S9B7QZNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider= new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);