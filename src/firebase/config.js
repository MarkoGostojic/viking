import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCqgNu6B0NwF-uQlrzLjBqEYLfzcV902zE",
  authDomain: "gradiliste-63a85.firebaseapp.com",
  projectId: "gradiliste-63a85",
  storageBucket: "gradiliste-63a85.appspot.com",
  messagingSenderId: "281434998446",
  appId: "1:281434998446:web:248bf660db14c206454f3f",
};

// init firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
export { db, serverTimestamp, auth };
