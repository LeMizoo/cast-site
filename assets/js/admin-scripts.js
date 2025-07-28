import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const authSection = document.getElementById("auth-section");
  const checkMessage = document.getElementById("auth-check");
  const panelMembres = document.getElementById("panel-membres");
  const panelFichiers = document.getElementById("panel-fichiers");

  if (user) {
    checkMessage.style.display = "none";
    authSection.style.display = "none";
    panelMembres.style.display = "block";
    panelFichiers.style.display = "block";
    console.log("Connecté :", user.email);
  } else {
    authSection.style.display = "block";
    panelMembres.style.display = "none";
    panelFichiers.style.display = "none";
  }
});
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Affichage des sections
    checkMessage.style.display = "none";
    authSection.style.display = "none";
    panelMembres.style.display = "block";
    panelFichiers.style.display = "block";

    // 🎨 Chargement de la galerie
    chargerGalerieAvancee();
  } else {
    authSection.style.display = "block";
    panelMembres.style.display = "none";
    panelFichiers.style.display = "none";
  }
});

// Bouton Connexion
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      alert("Merci de remplir les champs email et mot de passe.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`Connexion réussie 🥳 Bienvenue ${user.email}`);
        // ici la logique Firebase redirigera ou affichera le panneau selon onAuthStateChanged
      })
      .catch((error) => {
        alert("Échec de connexion ❌ Vérifie ton email/mot de passe ou ton autorisation.");
        console.error("Erreur de connexion :", error);
      });
  });
}
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const storage = getStorage();
const uploadBtn = document.getElementById("uploadBtn");

if (uploadBtn) {
  uploadBtn.addEventListener("click", () => {
    const fileInput = document.getElementById("mediaInput");
    const file = fileInput.files[0];

    if (!file) {
      alert("Sélectionne un fichier avant de téléverser.");
      return;
    }

    const storageRef = ref(storage, `media/${Date.now()}_${file.name}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        alert("Fichier téléversé avec succès 📦");
        console.log("URL du fichier :", downloadURL);
        // Tu peux maintenant enregistrer cette URL dans Firestore, ou l'afficher dans la galerie
      })
      .catch((error) => {
        alert("Erreur de téléversement ❌");
        console.error("Firebase Storage error :", error);
      });
  });
}

function chargerGalerieAvancee() {
  const storage = getStorage();
  const mediaRef = ref(storage, "media");

  listAll(mediaRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          const img = document.createElement("img");
          img.src = url;
          img.alt = "media";
          img.className = "img-thumbnail me-2 mb-2";
          galleryContainer.appendChild(img);
        });
      });
    })
    .catch((error) => {
      console.error("Erreur chargement galerie :", error);
    });
}
function chargerGalerieAvancee() {
  const storage = getStorage();
  const mediaRef = ref(storage, "media");

  listAll(mediaRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          const card = document.createElement("div");
          card.className = "col-md-4 mb-3";

          card.innerHTML = `
            <div class="card shadow-sm">
              <img src="${url}" alt="media" class="card-img-top">
              <div class="card-body">
                <p class="card-text">${itemRef.name}</p>
                <button class="btn btn-danger btn-sm">Supprimer</button>
              </div>
            </div>
          `;

          // ⚠️ Supprimer le fichier depuis Firebase Storage
          card.querySelector("button").addEventListener("click", () => {
            if (confirm("Confirmer la suppression du fichier ?")) {
              itemRef.delete()
                .then(() => {
                  alert("Fichier supprimé ✅");
                  card.remove();
                })
                .catch((error) => {
                  console.error("Erreur de suppression :", error);
                  alert("Impossible de supprimer ce fichier.");
                });
            }
          });

          galleryContainer.appendChild(card);
        });
      });
    })
    .catch((error) => {
      console.error("Erreur galerie avancée :", error);
    });
}