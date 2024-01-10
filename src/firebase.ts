import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCpwPMqWRGc2xNmypl2Lha3EjI63sYOgJA",
  authDomain: "weatherwalay-6f785.firebaseapp.com",
  databaseURL:
    "https://weatherwalay-6f785-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "weatherwalay-6f785",
  storageBucket: "weatherwalay-6f785.appspot.com",
  messagingSenderId: "327921425189",
  appId: "1:327921425189:web:83b2fedc9c61f338ac98cc",
  measurementId: "G-MRKKMLQZR0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
