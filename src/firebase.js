import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDiXehGw6eFjFZc_csiwAuAKCLSaJXmKBI",
  authDomain: "think-piece-live-f7b7d.firebaseapp.com",
  databaseURL: "https://think-piece-live-f7b7d.firebaseio.com",
  projectId: "think-piece-live-f7b7d",
  storageBucket: "think-piece-live-f7b7d.appspot.com",
  messagingSenderId: "313102502831"
};
firebase.initializeApp(config);

window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  //Get a reference to the place in the database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);
  //Go and fetch document from that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("Error created");
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore
      .collection("users")
      .doc(uid)
      .get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.log("error with collecting users data");
  }
};

export const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
