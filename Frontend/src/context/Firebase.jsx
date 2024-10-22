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

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const firestore = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp);
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

  console.log(user)

  const handleCreateNewListing = async (title, description, image, tags, status) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${image.name}`)
    const uplaoadResult = await uploadBytes(imageRef, image)
    return await addDoc(collection(firestore, "listings"), {
      title,
      description,
      imageURL: uplaoadResult.ref.fullPath,
      tags,
      status,
      userID: user.uid,
      userEmail: user.email,
      displayname: user.displayName,
      photoURL: user.photoURL
    })
  }

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider value={{
      firebaseAuth,
      signupUserWithEmailAndPassword,
      signinUserWithEmailAndPassword,
      signinWithGoogle,
      isLoggedIn,
      handleCreateNewListing
    }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
