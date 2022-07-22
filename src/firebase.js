// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6scQLxjuD-SyqlEfzjs7vaCeQMDUAKSg",
    authDomain: "weekly-meal-8fe67.firebaseapp.com",
    projectId: "weekly-meal-8fe67",
    storageBucket: "weekly-meal-8fe67.appspot.com",
    messagingSenderId: "630409495848",
    appId: "1:630409495848:web:435a0c389cebf14ae57c1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
