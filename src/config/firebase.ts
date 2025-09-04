import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyDnhXgYXcZF8xiGIfR0FYv562QbwXJrhUY",
  authDomain: "parakolik-c88fa.firebaseapp.com",
  projectId: "parakolik-c88fa",
  storageBucket: "parakolik-c88fa.firebasestorage.app",
  messagingSenderId: "545300720741",
  appId: "1:545300720741:web:e77f87e2aa80b7a0b36a8c",
  measurementId: "G-K9WBLZSS2B"
};

// Google OAuth Client ID (Firebase Console'dan alın)
export const GOOGLE_CLIENT_ID = "545300720741-6s91oguidmq4534su962gjaf1avrpf8h.apps.googleusercontent.com";

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Authentication servisini AsyncStorage ile başlat
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export default app;
