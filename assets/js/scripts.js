// 🎶 Citations en rotation
const citations = [
  "« Ce que vous entendrez aujourd’hui, ce ne sont pas des voix… Ce sont des âmes en prière. »",
  "« Chaque note est un souffle, chaque silence est un battement du cœur collectif. »",
  "« L'art sacré est une prière que l'on partage sans mot. »"
];

function afficherCitation() {
  const cible = document.getElementById("citation-dynamique");
  if (!cible) return;

  let index = 0;
  cible.textContent = citations[index];

  setInterval(() => {
    index = (index + 1) % citations.length;
    cible.textContent = citations[index];
  }, 6000);
}

document.addEventListener("DOMContentLoaded", afficherCitation);

// 🧭 Lien actif (dropdown inclus)
function activerLienMenu() {
  const pageActuelle = window.location.pathname.split("/").pop();
  const liens = document.querySelectorAll(".nav-link, .dropdown-item");

  liens.forEach(lien => {
    if (lien.getAttribute("href") === pageActuelle) {
      lien.classList.add("active", "fw-bold", "text-warning");

      const parentDropdown = lien.closest(".dropdown-menu");
      if (parentDropdown) {
        const toggle = parentDropdown.previousElementSibling;
        if (toggle) toggle.classList.add("text-warning");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", activerLienMenu);

// 📱 Fermeture burger mobile après clic
function fermetureBurgerApresClic() {
  const liens = document.querySelectorAll(".nav-link, .dropdown-item");
  liens.forEach(lien => {
    lien.addEventListener("click", () => {
      const menu = document.querySelector("#menuCAST");
      if (menu && menu.classList.contains("show")) {
        new bootstrap.Collapse(menu).hide();
      }
    });
  });
}
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "admin.html"; // accès autorisé
  } else {
    // reste sur la page avec le message “Vérification des droits d’accès…”
  }
});
document.addEventListener("DOMContentLoaded", fermetureBurgerApresClic);