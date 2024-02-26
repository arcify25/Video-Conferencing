// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTpnFp58Tdh9-Bd2MZNO7ODgia_4q1ZtE",
  authDomain: "zoom-clone-fd72d.firebaseapp.com",
  projectId: "zoom-clone-fd72d",
  storageBucket: "zoom-clone-fd72d.appspot.com",
  messagingSenderId: "761036151806",
  appId: "1:761036151806:web:736fb0cc4e2042d7fefeaf",
  measurementId: "G-7WHDXST25N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
export const userRef = collection(firebaseDB, "users");
export const meetingRef = collection(firebaseDB, "meetings");
