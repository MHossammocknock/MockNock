import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbpGEFp1C-u3qfvFr4k6KDE5SRQyk4hWs",
  authDomain: "mocknock-6163d.firebaseapp.com",
  projectId: "mocknock-6163d",
  storageBucket: "mocknock-6163d.firebasestorage.app",
  messagingSenderId: "762998354333",
  appId: "1:762998354333:web:474fbdc66755709c503f74",
  measurementId: "G-98G8DPW3ZT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
