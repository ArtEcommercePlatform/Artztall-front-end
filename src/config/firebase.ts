// firebase.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: 'process.env.REACT_APP_FIREBASE_PROJECT_ID',
  storageBucket: 'process.env.REACT_APP_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'process.env.REACT_APP_FIREBASE_APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);