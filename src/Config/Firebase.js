// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider, FacebookAuthProvider,  GithubAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKq1_gFf_eohW59kSId9hdoc4O-mY2a34",
  authDomain: "global-bank-app.firebaseapp.com",
  projectId: "global-bank-app",
  storageBucket: "global-bank-app.appspot.com",
  messagingSenderId: "236667476211",
  appId: "1:236667476211:web:40536acfbd430e5f397f86",
  measurementId: "G-M7QJCRP7VY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
export {auth, analytics,firestore,provider,facebookProvider,githubProvider};
