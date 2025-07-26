import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const docRef = doc(db, "membres", user.uid); // 🔁 Correction: "membres" au lieu de "utilisateurs"
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const { nom, prenom, affiliation, adresse, email } = data;

    // 🖼️ Injection UI
    const banner = document.getElementById("profil-banner");
    const elements = {
      "member-name": `${prenom} ${nom}`,
      "member-email": email,
      "member-adresse": adresse,
      "member-affiliation": affiliation.toUpperCase(),
      "member-affiliation-full": affiliation
    };

    Object.entries(elements).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    });

    if (banner) banner.classList.add("affiliation-" + affiliation.toLowerCase());

    // 🙏 Citation spirituelle
    const citationMap = {
      fjekm: "« L’Éternel est mon berger, je ne manquerai de rien. » – Psaume 23:1",
      ecar: "« Heureux les artisans de paix. » – Matthieu 5:9",
      flm: "« Dieu est notre refuge et notre force. » – Psaume 46:1",
      eam: "« Ne crains rien, car je suis avec toi. » – Ésaïe 41:10",
    };

    const citationText = citationMap[affiliation.toLowerCase()] ||
      "« Aime ton prochain comme toi-même. » – Marc 12:31";

    const citationEl = document.getElementById("citation");
    if (citationEl) citationEl.textContent = citationText;
  }
});