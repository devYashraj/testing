import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdWkkI9rwW7qy9jjvwy-zLQQtxLSmzR3I",
  authDomain: "react-test-app-86b34.firebaseapp.com",
  projectId: "react-test-app-86b34",
  storageBucket: "react-test-app-86b34.firebasestorage.app",
  messagingSenderId: "326276716781",
  appId: "1:326276716781:web:8fd639062571e3677b14e4"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

export {
  auth,
  db
}