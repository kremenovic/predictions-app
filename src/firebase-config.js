import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "predictionsapp-88f79.firebaseapp.com",
  projectId: "predictionsapp-88f79",
  storageBucket: "predictionsapp-88f79.appspot.com",
  messagingSenderId: "638736670632",
  appId: "1:638736670632:web:90453273de511b3551479d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
