// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQpY3OpHnPd0lDC1ZRd4e6knyxsbcqEJ0",
  authDomain: "isa-project-cc7a5.firebaseapp.com",
  projectId: "isa-project-cc7a5",
  storageBucket: "isa-project-cc7a5.appspot.com",
  messagingSenderId: "740207304421",
  appId: "1:740207304421:web:7b03a66ee900b23502fe0c",
  measurementId: "G-BS1E6T5HG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
