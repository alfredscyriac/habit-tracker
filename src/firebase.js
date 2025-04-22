// 1. Import the core app module from firebase
import { initializeApp } from "firebase/app";

// 2. Import individual services need for app from firebase
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 3. Configure local porject to firebase remote project by grabing config details from .env
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// 4. Initialize the Firebase App, essentially boots its up
const app = initializeApp(firebaseConfig);

// 5. Export the auth and database instances, will need to import these on other files to know user state 
export const auth = getAuth(app);
export const db   = getFirestore(app);