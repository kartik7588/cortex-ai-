// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexdemo-e6390.firebaseapp.com",
  projectId: "cortexdemo-e6390",
  storageBucket: "cortexdemo-e6390.firebasestorage.app",
  messagingSenderId: "1082531392669",
  appId: "1:1082531392669:web:79c302512c46a91ff07874"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()