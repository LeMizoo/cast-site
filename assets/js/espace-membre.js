// 🧩 Import des fonctions du module d'authentification
import {
  afficherFormulaireConnexion,
  afficherFormulaireInscription
} from "./authForms.js";

// ⏳ Attente des composants dynamiques (boutons générés plus tard)
document.addEventListener("DOMContentLoaded", () => {
  const observeButtons = setInterval(() => {
    const btnConnect = document.getElementById("btn-deja");
    const btnSignup = document.getElementById("btn-nouveau");

    if (btnConnect && btnSignup) {
      clearInterval(observeButtons);

      btnConnect.addEventListener("click", afficherFormulaireConnexion);
      btnSignup.addEventListener("click", afficherFormulaireInscription);
    }
  }, 100);
});

// 📁 Gestion de l’upload et aperçu des fichiers
const uploadZone = document.getElementById("upload-zone");
const fileInput = document.getElementById("fileInput");
const gallery = document.getElementById("media-gallery");

if (uploadZone && fileInput && gallery) {
  // 🖱️ Clic sur la zone déclenche le sélecteur
  uploadZone.addEventListener("click", () => fileInput.click());

  // 📸 Lecture et affichage des fichiers sélectionnés
  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    gallery.innerHTML = ""; // Nettoyage avant mise à jour

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const type = file.type.split("/")[0];
        let content = "";

        switch (type) {
          case "image":
            content = `<img src="${e.target.result}" class="img-fluid rounded shadow" alt="${file.name}"/>`;
            break;
          case "audio":
            content = `<audio controls src="${e.target.result}" class="w-100"></audio>`;
            break;
          case "video":
            content = `<video controls src="${e.target.result}" class="w-100 rounded"></video>`;
            break;
        }

        if (content) {
          const col = document.createElement("div");
          col.className = "col-md-4 mb-3";
          col.innerHTML = content;
          gallery.appendChild(col);
        }
      };

      reader.readAsDataURL(file);
    });
  });
}
// 🧭 Gestion de l'affichage des formulaires
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