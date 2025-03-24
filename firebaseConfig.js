import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqHomX-GSUzQOf9j6g3G4HNGTlQPtySdk",
  authDomain: "un-truc-de-jesus-carte.firebaseapp.com",
  projectId: "un-truc-de-jesus-carte",
  storageBucket: "un-truc-de-jesus-carte.appspot.com",
  messagingSenderId: "255170124059",
  appId: "1:255170124059:web:9b7818ec3f7e5b127b9bbe",
  measurementId: "G-E7R22DLZ61",
};

const appForStorage = initializeApp(firebaseConfig);
const db = getFirestore(appForStorage);
const auth = getAuth(appForStorage);

export { db, auth, appForStorage };
