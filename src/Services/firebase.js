import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDwd52YJ8QlwTHg63B5dZiuqw-Hv26-n54",
  authDomain: "react-chat-gb.firebaseapp.com",
  projectId: "react-chat-gb",
  storageBucket: "react-chat-gb.appspot.com",
  messagingSenderId: "154746087947",
  appId: "1:154746087947:web:2d00762692c135e894350e",
  measurementId: "G-QRDZVW6QN6",
  databaseURL:
    "https://react-chat-gb-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
