import {
  auth,
  db,
  storage
} from "./firebase-config.js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

window.addEventListener("DOMContentLoaded", () => {
  // 🎭 Citations dynamiques
  const citations = [
    "« Ce que vous entendrez aujourd’hui, ce ne sont pas des voix… Ce sont des âmes en prière. »",
    "« Chaque note est un souffle, chaque silence est un battement du cœur collectif. »",
    "« L'art sacré est une prière que l'on partage sans mot. »"
  ];
  let index = 0;
  const cible = document.getElementById("citation-dynamique");
  if (cible) {
    cible.textContent = citations[index];
    setInterval(() => {
      index = (index + 1) % citations.length;
      cible.textContent = citations[index];
    }, 6000);
  }

  // 🔧 Références DOM
  const emailLogin = document.getElementById("email-login");
  const passwordLogin = document.getElementById("password-login");
  const emailSignup = document.getElementById("email-signup");
  const confirmEmail = document.getElementById("confirm-email");
  const passwordSignup = document.getElementById("password-signup");
  const confirmPassword = document.getElementById("confirm-password");
  const nom = document.getElementById("nom");
  const prenom = document.getElementById("prenom");
  const religion = document.getElementById("religion");
  const adresse = document.getElementById("adresse");
  const userInfo = document.getElementById("user-info");
  const uploadZone = document.getElementById("upload-zone");
  const gallery = document.getElementById("media-gallery");
  const feedback = document.getElementById("upload-feedback");

  // 🧠 Fonction UI
  function updateUI(user) {
    if (user) {
      document.querySelector("h2").textContent = `Bienvenue ${user.email}`;
      uploadZone.style.display = "block";
      gallery.innerHTML = "<p class='text-muted'>Vos fichiers s'afficheront ici...</p>";
      if (userInfo) userInfo.textContent = `Connecté en tant que : ${user.email}`;
    } else {
      document.querySelector("h2").textContent = "Espace membre — C.A.S.T.";
      uploadZone.style.display = "none";
      gallery.innerHTML = "";
      if (userInfo) userInfo.textContent = "";
    }
  }

  // 🔐 Auth listener
  onAuthStateChanged(auth, (user) => {
    updateUI(user);
    if (!user) {
      alert("🔐 Vous devez vous connecter pour accéder à l’espace membre.");
    }
  });

  // 🔑 Connexion
  document.getElementById("login").addEventListener("click", (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailLogin.value, passwordLogin.value)
      .then((cred) => {
        alert("✅ Connecté !");
        updateUI(cred.user);
      })
      .catch(error => alert("Erreur : " + error.message));
  });

  // 🆕 Inscription + Firestore
  document.getElementById("signup").addEventListener("click", async (e) => {
    e.preventDefault();
    if (emailSignup.value !== confirmEmail.value) {
      feedback.textContent = "❌ Les e-mails ne correspondent pas.";
      return;
    }
    if (passwordSignup.value !== confirmPassword.value) {
      feedback.textContent = "❌ Les mots de passe ne correspondent pas.";
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, emailSignup.value, passwordSignup.value);
      const user = cred.user;

      await setDoc(doc(db, "membres", user.uid), {
        nom: nom?.value.trim() || "",
        prenom: prenom?.value.trim() || "",
        religion: religion?.value.trim() || "",
        adresse: adresse?.value.trim() || "",
        email: user.email,
        uid: user.uid,
        inscritLe: serverTimestamp()
      });

      feedback.textContent = `✅ Inscription réussie ! Bienvenue ${prenom?.value.trim() || ""} 🎶`;
      updateUI(user);

      setTimeout(() => {
        window.location.href = "/espace.html"; // ⬅ modifie ici selon ta page cible
      }, 2000);
    } catch (err) {
      feedback.textContent = "❌ Erreur lors de l’inscription : " + err.message;
    }
  });

  // 🚪 Déconnexion
  document.getElementById("logout")?.addEventListener("click", () => {
    signOut(auth).then(() => {
      alert("👋 Déconnecté !");
      updateUI(null);
    });
  });

  // 🔗 Connexion Google
  const googleProvider = new GoogleAuthProvider();
  document.getElementById("login-google")?.addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        alert("🎉 Connecté avec Google !");
        updateUI(result.user);
      })
      .catch(error => alert("Erreur Google : " + error.message));
  });

  // 📂 Aperçu fichiers + Upload
  document.getElementById("fileInput")?.addEventListener("change", async (event) => {
    const files = Array.from(event.target.files);
    gallery.innerHTML = ""; // Réinitialise la galerie

    for (const file of files) {
      const storageRef = ref(storage, `media/${auth.currentUser.uid}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const fileURL = URL.createObjectURL(file); // Prévisualisation locale
        const preview = file.type.startsWith("image/") ? `<img src="${fileURL}" class="img-fluid rounded">`
                     : file.type.startsWith("audio/") ? `<audio controls src="${fileURL}" class="w-100"></audio>`
                     : file.type.startsWith("video/") ? `<video controls src="${fileURL}" class="w-100 rounded"></video>`
                     : `<p>📄 Fichier non pris en charge : ${file.name}</p>`;

        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = preview;
        gallery.appendChild(col);
      } catch (err) {
        alert(`❌ Échec upload ${file.name} : ${err.message}`);
      }
    }
  });

  // 🎛️ Affichage formulaires
  document.getElementById("btn-deja").addEventListener("click", () => {
    document.getElementById("formulaire-auth").style.display = "block";
    document.getElementById("form-connexion").style.display = "block";
    document.getElementById("form-inscription").style.display = "none";
  });

  document.getElementById("btn-nouveau").addEventListener("click", () => {
    document.getElementById("formulaire-auth").style.display = "block";
    document.getElementById("form-connexion").style.display = "none";
    document.getElementById("form-inscription").style.display = "block";
  });
});