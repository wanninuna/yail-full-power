import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbXPYMshMlvl3bEkmtjNmbUEAVq5ytGx0",
  authDomain:"yali-full-power-644d2.firebaseapp.com",
  projectId:  "yali-full-power-644d2",
  storageBucket:"yali-full-power-644d2.firebasestorage.app",
  messagingSenderId: "808812131284",
  appId: "1:808812131284:web:0da86a0d1d8c01568c9c41"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export { db };
