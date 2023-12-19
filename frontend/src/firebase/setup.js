import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCOAPdcydJmNpS5ypD5IrHd23L-Whyt6hc",
  authDomain: "reservation-system-d7fe0.firebaseapp.com",
  projectId: "reservation-system-d7fe0",
  storageBucket: "reservation-system-d7fe0.appspot.com",
  messagingSenderId: "727601312718",
  appId: "1:727601312718:web:dd30764e3809f7befe719f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
