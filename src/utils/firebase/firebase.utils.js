import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGWpmTk6viKfoWJdjzPJC8NAxZOlBpz7g",
  authDomain: "crown-db-99041.firebaseapp.com",
  projectId: "crown-db-99041",
  storageBucket: "crown-db-99041.appspot.com",
  messagingSenderId: "317074170496",
  appId: "1:317074170496:web:c262b72e9890b37fe9bc65",
  measurementId: "G-1G019FZVZM",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshop = await getDoc(userDocRef);
  console.log(userSnapshop.exists());

  if (!userSnapshop.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.error(err);
    }
  }
};