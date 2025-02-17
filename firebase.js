// Importer les fonctions nécessaires du SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAO2ytoHv94HL6TasdaHdXA3z9qAYyhKtA",
  authDomain: "pfe-app-df97d.firebaseapp.com",
  projectId: "pfe-app-df97d",
  storageBucket: "pfe-app-df97d.appspot.com", // Correction ici
  messagingSenderId: "877772826760",
  appId: "1:877772826760:web:57ae8d79a69ad710d1173d",
  measurementId: "G-3W53FL9SJ3",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// ⚠️ Désactiver `getAnalytics` si tu es sous Expo
// const analytics = getAnalytics(app);

// Initialiser l'authentification et Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

// Exporter les instances et fonctions nécessaires
export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc };
