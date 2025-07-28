import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html"; // Redirection si non connecté
    return;
  }

  const docRef = doc(db, "utilisateurs", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const { nom, prenom, affiliation, adresse, email } = data;

    // Injection des données
    document.getElementById("member-name").textContent = `${prenom} ${nom}`;
    document.getElementById("member-email").textContent = email;
    document.getElementById("member-adresse").textContent = adresse;
    document.getElementById("member-affiliation").textContent = affiliation.toUpperCase();
    document.getElementById("member-affiliation-full").textContent = affiliation;

    // Attribution visuelle
    document.getElementById("profil-banner").classList.add("affiliation-" + affiliation.toLowerCase());

    // Citation spirituelle
    let citation = "";
    switch (affiliation.toLowerCase()) {
      case "fjekm":
        citation = "« L’Éternel est mon berger, je ne manquerai de rien. » – Psaume 23:1";
        break;
      case "ecar":
        citation = "« Heureux les artisans de paix. » – Matthieu 5:9";
        break;
      case "flm":
        citation = "« Dieu est notre refuge et notre force. » – Psaume 46:1";
        break;
      case "eam":
        citation = "« Ne crains rien, car je suis avec toi. » – Ésaïe 41:10";
        break;
      default:
        citation = "« Aime ton prochain comme toi-même. » – Marc 12:31";
    }
    document.getElementById("citation").textContent = citation;
  }
});