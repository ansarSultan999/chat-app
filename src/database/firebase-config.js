
import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore ,collection, addDoc  } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyANA6fZeWlmRYMVvmgkyuC4_KJxTZfmhxU",
  authDomain: "chat-app-349c6.firebaseapp.com",
  projectId: "chat-app-349c6",
  storageBucket: "chat-app-349c6.appspot.com",
  messagingSenderId: "405987167375",
  appId: "1:405987167375:web:3f2d8c20f0437507af74fa",
  measurementId: "G-K6KB6ZT1Z5"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 export { app ,auth ,createUserWithEmailAndPassword, db ,collection, addDoc ,signInWithEmailAndPassword ,getAuth}