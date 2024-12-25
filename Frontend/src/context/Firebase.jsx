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
  updateDoc,   // Import for updating docs
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
      } else {
        setUser(null);
      }
    });
  }, []);

  // Signup using email and password
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  // Signin using email and password
  const signinUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  // Signin using Google
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  console.log(user);

  // Create a new doubt listing
  const handleCreateNewListing = async (title, description, image, tags, status) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${image.name}`);
    const uploadResult = await uploadBytes(imageRef, image);
    return await addDoc(collection(firestore, "listings"), {
      title,
      description,
      imageURL: uploadResult.ref.fullPath,
      tags,
      status,
      userID: user.uid,
      userEmail: user.email,
      displayname: user.displayName,
      photoURL: user.photoURL,
    });
  };

  // List all doubts
  const listAllDoubts = () => {
    return getDocs(collection(firestore, "listings"));
  };

  // Get image URL from Firebase storage
  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  // Update a doubt (e.g., upvotes, status)
  const updateDoubt = async (id, data) => {
    const doubtRef = doc(firestore, "listings", id); // Reference to specific document
    return await updateDoc(doubtRef, data);          // Update the document with new data
  };

  const getDoubtById = async (id) => {
    const doubtRef = doc(firestore, "listings", id); // Reference to specific document
    return await getDoc(doubtRef);                    // Get the document data
  };

  // Fetch replies for a specific doubt
const getRepliesByDoubtId = async (doubtId) => {
  const repliesRef = collection(firestore, `listings/${doubtId}/replies`);
  return await getDocs(repliesRef);
};

// Post a reply to a specific doubt
const postReplyToDoubt = async (doubtId, replyData) => {
  const repliesRef = collection(firestore, `listings/${doubtId}/replies`);
  return await addDoc(repliesRef, {
    ...replyData,
    timestamp: new Date(),
    userId: user.uid,
    displayName: user.displayName || user.email,
  });
};

// Fetch user data by user ID
const getUserData = async (userId) => {
  const userRef = doc(firestore, "users", userId); // Assuming user data is stored in a "users" collection
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

// Update user profile data
const updateUserData = async (userId, data) => {
  const userRef = doc(firestore, "users", userId); // Reference to the user document
  return await updateDoc(userRef, data); // Update the document with new data
};

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider value={{
      firebaseAuth,
      firestore,
      signupUserWithEmailAndPassword,
      signinUserWithEmailAndPassword,
      signinWithGoogle,
      isLoggedIn,
      handleCreateNewListing,
      listAllDoubts,
      getImageURL,
      updateDoubt,
      getDoubtById,
      getRepliesByDoubtId,  // Add this
      postReplyToDoubt,      // Add this
      getUserData, // Add this
      updateUserData, // Add this
    }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
