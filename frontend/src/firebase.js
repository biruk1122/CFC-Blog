// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Define Firebase configuration object with project credentials
const firebaseConfig = {
  // API key for Firebase, stored in environment variables
  apiKey: import.meta.env.VITE_FIREBASE_ACCESS_KEY,
  // Auth domain for Firebase authentication
  authDomain: "cfc-daily.firebaseapp.com",
  // Project ID for Firebase project
  projectId: "cfc-daily",
  // Storage bucket for Firebase storage
  storageBucket: "cfc-daily.appspot.com",
  // Messaging sender ID for Firebase Cloud Messaging
  messagingSenderId: "623487572846",
  // App ID for the Firebase app
  appId: "1:623487572846:web:0d69e2a74125f87bb4bf7f",
}

// Initialize Firebase app with the configuration and export it
export const app = initializeApp(firebaseConfig)
