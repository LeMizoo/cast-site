window.addEventListener("DOMContentLoaded", () => {
  // ✨ Citations en rotation
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

  // 🔐 Gestion Firebase Auth
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const userInfo = document.getElementById("user-info");
  const uploadZone = document.getElementById("upload-zone");
  const gallery = document.getElementById("media-gallery");

  function updateUI(user) {
    if (user) {
      document.querySelector("h2").textContent = `Bienvenue ${user.email}`;
      uploadZone.style.display = "block";
      gallery.innerHTML = "<p class='text-muted'>Vos fichiers s'afficheront ici...</p>";
      userInfo.textContent = `Connecté en tant que : ${user.email}`;
    } else {
      document.querySelector("h2").textContent = "Espace membre — C.A.S.T.";
      uploadZone.style.display = "none";
      gallery.innerHTML = "";
      userInfo.textContent = "";
    }
  }

  // ✅ Version douce : pas de redirection automatique
  firebase.auth().onAuthStateChanged((user) => {
    updateUI(user);
    if (!user) {
      alert("🔐 Vous devez vous connecter pour accéder à l’espace membre.");
      // On reste sur le dashboard, le formulaire est visible
    }
  });

  document.getElementById("signup").addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("🎉 Compte créé !");
        updateUI(userCredential.user);
      })
      .catch(error => alert("Erreur : " + error.message));
  });

  document.getElementById("login").addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("✅ Connecté !");
        updateUI(userCredential.user);
      })
      .catch(error => alert("Erreur : " + error.message));
  });

  document.getElementById("logout").addEventListener("click", () => {
    firebase.auth().signOut()
      .then(() => {
        alert("👋 Déconnecté !");
        updateUI(null);
      });
  });

  // 📂 Aperçu des fichiers uploadés
  document.getElementById("fileInput").addEventListener("change", function (event) {
    gallery.innerHTML = "";
    Array.from(event.target.files).forEach(file => {
      const fileURL = URL.createObjectURL(file);
      const fileType = file.type;
      let preview = "";

      if (fileType.startsWith("image/")) {
        preview = `<img src="${fileURL}" class="img-fluid rounded" alt="${file.name}">`;
      } else if (fileType.startsWith("audio/")) {
        preview = `<audio controls src="${fileURL}" class="w-100"></audio>`;
      } else if (fileType.startsWith("video/")) {
        preview = `<video controls src="${fileURL}" class="w-100 rounded"></video>`;
      } else {
        preview = `<p>📄 Fichier non pris en charge : ${file.name}</p>`;
      }

      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = preview;
      gallery.appendChild(col);
    });
  });
});
document.getElementById("btn-nouveau").addEventListener("click", () => {
  document.getElementById("signup").style.display = "inline-block";
  document.getElementById("login").style.display = "none";
  document.getElementById("email").style.display = "block";
  document.getElementById("password").style.display = "block";
});

document.getElementById("btn-deja").addEventListener("click", () => {
  document.getElementById("login").style.display = "inline-block";
  document.getElementById("signup").style.display = "none";
  document.getElementById("email").style.display = "block";
  document.getElementById("password").style.display = "block";
});
document.getElementById("btn-nouveau").addEventListener("click", () => {
  document.getElementById("signup").style.display = "inline-block";
  document.getElementById("login").style.display = "none";
  document.getElementById("email").style.display = "block";
  document.getElementById("password").style.display = "block";
});

document.getElementById("btn-deja").addEventListener("click", () => {
  document.getElementById("login").style.display = "inline-block";
  document.getElementById("signup").style.display = "none";
  document.getElementById("email").style.display = "block";
  document.getElementById("password").style.display = "block";
});
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const lastname = signupForm.lastname.value.trim();
    const firstname = signupForm.firstname.value.trim();
    const religion = signupForm.religion.value.trim();
    const address = signupForm.address.value.trim();
    const email = signupForm.email.value.trim();
    const confirmEmail = signupForm["confirm-email"].value.trim();
    const password = signupForm.password.value;
    const confirmPassword = signupForm["confirm-password"].value;

    if (email !== confirmEmail) {
      alert("❌ Les adresses e-mail ne correspondent pas.");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("🎉 Compte créé !");
        window.location.href = "espace-membre.html";
        // 👉 Ajouter Firestore ici pour enregistrer les infos complémentaires
      })
      .catch(error => alert("Erreur : " + error.message));
  });
}

// 🔗 S’inscrire via Google
const googleSignupBtn = document.getElementById("google-signup");
const googleProvider = new firebase.auth.GoogleAuthProvider();

if (googleSignupBtn) {
  googleSignupBtn.addEventListener("click", () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        alert("🎉 Compte Google créé !");
        window.location.href = "espace-membre.html";
        // 👉 Ajouter Firestore ici pour stocker données Google si besoin
      })
      .catch((error) => {
        alert("Erreur Google : " + error.message);
      });
  });
}const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const lastname = signupForm.lastname.value.trim();
    const firstname = signupForm.firstname.value.trim();
    const religion = signupForm.religion.value.trim();
    const address = signupForm.address.value.trim();
    const email = signupForm.email.value.trim();
    const confirmEmail = signupForm["confirm-email"].value.trim();
    const password = signupForm.password.value;
    const confirmPassword = signupForm["confirm-password"].value;

    if (email !== confirmEmail) {
      alert("❌ Les adresses e-mail ne correspondent pas.");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("🎉 Compte créé !");
        window.location.href = "espace-membre.html";
        // 👉 Stocker les infos supplémentaires dans Firestore (optionnel)
      })
      .catch(error => alert("Erreur : " + error.message));
  });
}

// 🔗 Inscription via Google
const googleSignupBtn = document.getElementById("google-signup");
const googleProvider = new firebase.auth.GoogleAuthProvider();

if (googleSignupBtn) {
  googleSignupBtn.addEventListener("click", () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        alert("🎉 Compte Google créé !");
        window.location.href = "espace-membre.html";
        // 👉 Stocker les infos Google dans Firestore (optionnel)
      })
      .catch((error) => {
        alert("Erreur Google : " + error.message);
      });
  });
}
// Connexion avec Google
document.getElementById('login-google').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      console.log('Connecté avec Google:', result.user);
    })
    .catch(error => {
      console.error('Erreur Google:', error);
    });
});

// Connexion avec Facebook
document.getElementById('login-facebook').addEventListener('click', () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      console.log('Connecté avec Facebook:', result.user);
    })
    .catch(error => {
      console.error('Erreur Facebook:', error);
    });
});