// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAndO0ZS0XX-1VDcj0Vzx4PkT_cYdrctd4",
  authDomain: "lytortech-53590.firebaseapp.com",
  projectId: "lytortech-53590",
  storageBucket: "lytortech-53590.firebasestorage.app",
  messagingSenderId: "498653708871",
  appId: "1:498653708871:web:77a45a4ab2f1e160f92762",
  measurementId: "G-5TRVSMER35"
};


const app = initializeApp(firebaseConfig);
console.log("✅ Firebase initialized:", app.name);
export const auth = getAuth(app);
