import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKue2FBlrIa_6TGmQR6Gl1nDw_ptx-GyI",
  authDomain: "learn-web-development-f0d22.firebaseapp.com",
  projectId: "learn-web-development-f0d22",
  storageBucket: "learn-web-development-f0d22.appspot.com",
  messagingSenderId: "55949130197",
  appId: "1:55949130197:web:ba27885dcf9ca9c104a55c",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db, onAuthStateChanged };
