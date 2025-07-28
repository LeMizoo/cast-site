// Initialisation Firebase (clés visibles côté client)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD0lcH0MWPGbSsfEB3ZkGVrvu9h1m5F8YY",
  authDomain: "cast-espace-membre.firebaseapp.com",
  projectId: "cast-espace-membre",
  storageBucket: "cast-espace-membre.firebasestorage.app",
  messagingSenderId: "665168161680",
  appId: "1:665168161680:web:66260020196e0e25546115",
  measurementId: "G-8MP04MJMS1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };