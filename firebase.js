// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk2XSNdsSX7ma2cvA19_uo5SsbTpYH9ls",
  authDomain: "pomkara-high-school.firebaseapp.com",
  projectId: "pomkara-high-school",
  storageBucket: "pomkara-high-school.appspot.com",
  messagingSenderId: "715630956307",
  appId: "1:715630956307:web:2fc487fa09a307cf2194e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export default auth;