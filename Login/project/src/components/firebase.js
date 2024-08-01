// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMhlHXi3zCMwUTBiQfir8ZRKlTbDqeo-c",
  authDomain: "login-auth-ae869.firebaseapp.com",
  projectId: "login-auth-ae869",
  storageBucket: "login-auth-ae869.appspot.com",
  messagingSenderId: "94692758990",
  appId: "1:94692758990:web:bed4b8a5f26d626d9b479f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;