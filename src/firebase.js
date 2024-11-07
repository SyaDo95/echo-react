// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhuYJhBA280xNkiI3gO7m8KqRopn_NWYI",
    authDomain: "echo-auth-1107.firebaseapp.com",
    projectId: "echo-auth-1107",
    storageBucket: "echo-auth-1107.firebasestorage.app",
    messagingSenderId: "1056404289619",
    appId: "1:1056404289619:web:b9061234e5f2f072f96ea6",
    measurementId: "G-NQ3ZMWCV3D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
