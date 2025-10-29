import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR-APY-KEY",
  authDomain: "dyslexia-88718.firebaseapp.com",
  projectId: "dyslexia-88718",
  storageBucket: "dyslexia-88718.appspot.com", 
  messagingSenderId: "281664427481",
  appId: "1:281664427481:web:d74d8dc070fe53a01835c8"
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});