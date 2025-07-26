import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyD0lcH0MWPGbSsfEB3ZkGVrvu9h1m5F8YY",
  authDomain: "cast-espace-membre.firebaseapp.com",
  projectId: "cast-espace-membre",
  storageBucket: "cast-espace-membre.appspot.com",
  messagingSenderId: "665168161680",
  appId: "1:665168161680:web:66260020196e0e25546115",
  measurementId: "G-8MP04MJMS1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const toggleForm = (mode) => {
  document.getElementById("form-nouveau").style.display = mode === "nouveau" ? "block" : "none";
  document.getElementById("form-deja").style.display = mode === "deja" ? "block" : "none";
};
document.getElementById("btn-nouveau").onclick = () => toggleForm("nouveau");
document.getElementById("btn-deja").onclick = () => toggleForm("deja");

document.getElementById("btn-creer-compte").onclick = async () => {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const affiliation = document.getElementById("affiliation").value;
  const adresse = document.getElementById("adresse").value.trim();
  const email = document.getElementById("email-nouveau").value.trim();
  const emailConfirm = document.getElementById("email-confirm").value.trim();
  const password = document.getElementById("password-nouveau").value;
  const passwordConfirm = document.getElementById("password-confirm").value;

  if (email !== emailConfirm || password !== passwordConfirm) {
    alert("⚠️ Email ou mot de passe non confirmé correctement.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "membres", uid), {
      nom,
      prenom,
      affiliation,
      adresse,
      email,
      uid,
      createdAt: new Date().toISOString(),
      isAdmin: false
    });

    const citation = {
      "fjekm": "« L’Éternel est mon berger... »",
      "ecar": "« Heureux les artisans de paix. »",
      "flm": "« Dieu est notre refuge... »",
      "eam": "« Ne crains rien, je suis avec toi. »",
      "autre": "« Aime ton prochain comme toi-même. »"
    }[affiliation.toLowerCase()] || "« Soyez lumière dans le monde. »";

    alert(`✅ Bienvenue ${prenom} ! ${citation}`);
  } catch (error) {
    alert("Erreur : " + error.message);
  }
};

document.getElementById("btn-login").onclick = async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Connecté avec succès !");
  } catch (error) {
    alert("Erreur de connexion : " + error.message);
  }
};

document.getElementById("btn-logout").onclick = async () => {
  try {
    await signOut(auth);
    alert("🚪 Déconnecté !");
    document.getElementById("upload-zone").style.display = "none";
    document.getElementById("user-info").textContent = "Non connecté";
  } catch (error) {
    alert("Erreur : " + error.message);
  }
};