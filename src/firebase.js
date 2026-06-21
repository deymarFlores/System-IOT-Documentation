import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAd1qHVQ8R5_K_XDWooDcFezTycC6alPXw",
  authDomain: "systemiotdocs.firebaseapp.com",
  projectId: "systemiotdocs",
  storageBucket: "systemiotdocs.firebasestorage.app",
  messagingSenderId: "644518984630",
  appId: "1:644518984630:web:45391fca292bca48c65f17"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
