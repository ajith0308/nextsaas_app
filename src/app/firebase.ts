// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_4V3xzwz2_aKVc90YKy1B8cp7zwasoZQ",
  authDomain: "portfolio-7f778.firebaseapp.com",
  projectId: "portfolio-7f778",
  storageBucket: "portfolio-7f778.firebasestorage.app",
  messagingSenderId: "93928749115",
  appId: "1:93928749115:web:c6ddf5b21d6c7a6832041e",
  measurementId: "G-CCRFK2MEXJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
