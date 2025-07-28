document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("galerie-medias");
  if (!gallery) return;

  // Simule quelques fichiers envoyés (à remplacer par des données Firebase)
  const fichiers = [
    { type: "audio", src: "uploads/chant1.mp3", titre: "Chant Sacré 1" },
    { type: "image", src: "uploads/photo1.jpg", titre: "Harmonie en lumière" },
    { type: "video", src: "uploads/video1.mp4", titre: "Répétition du chœur" }
  ];

  fichiers.forEach(fichier => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    let mediaContent = "";
    if (fichier.type === "audio") {
      mediaContent = `<audio controls src="${fichier.src}" class="w-100"></audio>`;
    } else if (fichier.type === "image") {
      mediaContent = `<img src="${fichier.src}" alt="${fichier.titre}" class="img-fluid rounded">`;
    } else if (fichier.type === "video") {
      mediaContent = `<video controls src="${fichier.src}" class="w-100 rounded"></video>`;
    }

    card.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${fichier.titre}</h5>
          ${mediaContent}
        </div>
      </div>
    `;
    gallery.appendChild(card);
  });
});
const vocales = document.getElementById("galerie-vocales");
const visuelles = document.getElementById("galerie-visuelles");

fichiers.forEach(fichier => {
  const card = document.createElement("div");
  card.className = "col-md-4";

  let mediaContent = "";
  if (fichier.type === "audio") {
    mediaContent = `<audio controls src="${fichier.src}" class="w-100"></audio>`;
  } else if (fichier.type === "image") {
    mediaContent = `<img src="${fichier.src}" alt="${fichier.titre}" class="img-fluid rounded">`;
  } else if (fichier.type === "video") {
    mediaContent = `<video controls src="${fichier.src}" class="w-100 rounded"></video>`;
  }

  card.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${fichier.titre}</h5>
        ${mediaContent}
      </div>
    </div>
  `;

  // Section d'affichage ciblée
  if (fichier.type === "audio" && vocales) {
    vocales.appendChild(card);
  } else if ((fichier.type === "image" || fichier.type === "video") && visuelles) {
    visuelles.appendChild(card);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("galerie-medias");
  const filtreType = document.getElementById("filtre-type");
  const searchBar = document.getElementById("search-bar");

  const fichiers = [
    { type: "audio", src: "uploads/chant1.mp3", titre: "Chant Sacré 1" },
    { type: "image", src: "uploads/photo1.jpg", titre: "Harmonie en lumière" },
    { type: "video", src: "uploads/video1.mp4", titre: "Répétition du chœur" }
  ];

  function afficherFichiers() {
    const typeChoisi = filtreType?.value || "all";
    const recherche = searchBar?.value?.toLowerCase() || "";

    gallery.innerHTML = "";

    fichiers.forEach(fichier => {
      if (
        (typeChoisi === "all" || fichier.type === typeChoisi) &&
        fichier.titre.toLowerCase().includes(recherche)
      ) {
        const card = document.createElement("div");
        card.className = "col-md-4 fade-in";

        let mediaContent = "";
        if (fichier.type === "audio") {
          mediaContent = `<audio controls src="${fichier.src}" class="w-100"></audio>`;
        } else if (fichier.type === "image") {
          mediaContent = `<img src="${fichier.src}" alt="${fichier.titre}" class="img-fluid rounded">`;
        } else if (fichier.type === "video") {
          mediaContent = `<video controls src="${fichier.src}" class="w-100 rounded"></video>`;
        }

        card.innerHTML = `
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${fichier.titre}</h5>
              ${mediaContent}
            </div>
          </div>
        `;
        gallery.appendChild(card);
      }
    });
  }

  filtreType?.addEventListener("change", afficherFichiers);
  searchBar?.addEventListener("input", afficherFichiers);

  afficherFichiers(); // Initialisation
});