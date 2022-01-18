import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
require('dotenv').config()

const config = {
  apiKey: "AIzaSyDaAIrhvH2h6IfWzeYtO0xkUxP5NOd9Bm8",
  authDomain: "dmp-bures.firebaseapp.com",
  projectId: "dmp-bures",
  storageBucket: "dmp-bures.appspot.com",
  messagingSenderId: "58363618586",
  appId: "1:58363618586:web:18b6f64d4b44fd7abd38a3"
};
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };


export const app = initializeApp(config);
export const db = getFirestore(app);

