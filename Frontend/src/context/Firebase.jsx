import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4mkD7N4P8i3CFer3GxfySYPl2IgvMoHE",
  authDomain: "skillswap-007.firebaseapp.com",
  projectId: "skillswap-007",
  storageBucket: "skillswap-007.appspot.com",
  messagingSenderId: "35156699369",
  appId: "1:35156699369:web:b1b289af381ae7cba12878",
  measurementId: "G-VW7S1PL02X"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig); 
const firebaseAuth = getAuth(firebaseapp);
const googleProvider = new GoogleAuthProvider();

// Firebase context
const FirebaseContext = createContext(null);

// Hook to use Firebase
export const useFirebase = () => useContext(FirebaseContext);

// Firebase Provider
export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      }
      else{
        setUser(null);
      }
    })
  }, []);

  // Signup using email and password
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  // Signin using email and password
  const signinUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  // Signin using Google
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider value={{
      firebaseAuth,
      signupUserWithEmailAndPassword,
      signinUserWithEmailAndPassword,
      signinWithGoogle,
      isLoggedIn
    }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
