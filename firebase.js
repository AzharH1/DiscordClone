// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBem9tG952n41uGyQj48IFhpggWZyO5DyM",
  authDomain: "discord-clone-5ddb2.firebaseapp.com",
  projectId: "discord-clone-5ddb2",
  storageBucket: "discord-clone-5ddb2.appspot.com",
  messagingSenderId: "888604773604",
  appId: "1:888604773604:web:3fa44b592dcb2bb0f9b0f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "[UNIQUE_NAME]");

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}