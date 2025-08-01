
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'numeroconnect-637lh',
  appId: '1:818339710146:web:01271839b424e1d7d9675b',
  storageBucket: 'numeroconnect-637lh.firebasestorage.app',
  apiKey: 'AIzaSyDegTkPCfQC6nYziFLncbfnM7r-WUuo8nw',
  authDomain: 'numeroconnect-637lh.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '818339710146',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
