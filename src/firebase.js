import firebase from "firebase/app";
import "firebase/firestore";
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

export const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
