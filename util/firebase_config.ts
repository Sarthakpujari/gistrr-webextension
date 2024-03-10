import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAFRIC_sKYTEyYsXyGfCYK-a7PYf8QGm-A",
  authDomain: "gistrr-a10e2.firebaseapp.com",
  projectId: "gistrr-a10e2",
  storageBucket: "gistrr-a10e2.appspot.com",
  messagingSenderId: "703242511198",
  appId: "1:703242511198:web:994ec6574714c5060865cf",
  measurementId: "G-Q7E548G0FH",
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
