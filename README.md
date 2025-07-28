🌟 CAST-SITE-1 — Création artistique et spirituelle en HTML/JS
Un site web multi-pages conçu avec soin, mêlant esthétique, logique, spiritualité et interaction.
Ce projet repose sur du HTML, CSS et JavaScript natifs, enrichi par l’intégration de Firebase (Authentication et Firestore) pour offrir une expérience fluide, élégante et sécurisée.

🎯 Objectifs
- Offrir un espace d’inspiration à travers l’art, les calculs poétiques (comme Fibonacci) et la voix sacrée.
- Permettre aux membres de créer un profil, se connecter, naviguer dans une galerie et accéder à du contenu personnalisé.

🚀 Fonctionnalités
- 🔐 Authentification par email avec Firebase
- 📁 Sauvegarde des profils utilisateurs dans Firestore
- 🎵 Intégration de fichiers audio sacrés (chants, voix)
- 🖼️ Galerie dynamique
- 🌿 Pages dédiées à la poésie, à l’engagement et à l’inspiration
- 🔢 Calcul basé sur la suite de Fibonacci pour éveiller la curiosité

🧰 Technologies utilisées
- HTML / CSS / JavaScript natifs
- Firebase (Auth + Firestore)
- Vercel (déploiement)
- Utilisation de composants HTML chargés dynamiquement (header, footer, head, galerie)

📁 Organisation du projet
CAST-SITE-1/
├── assets/
│   ├── audio/         ← fichiers MP3 sacrés
│   ├── css/           ← styles poétiques & responsivité
│   ├── js/            ← scripts fonctionnels et Firebase
│   ├── images/, img/  ← éléments visuels
│   └── videos/        ← contenu vidéo éventuel
├── components/        ← blocs HTML réutilisables
│   ├── footer.html     ← pied de page harmonieux
│   ├── galerie.html    ← galerie contemplative
│   ├── head.html       ← balises meta & style
│   ├── header.html     ← en-tête navigation
├── index.html         ← page d'accueil
├── *.html             ← nombreuses pages thématiques (profil, inscription, galerie…)
├── firebase-config.js ← configuration Firebase (⚠️ ignorée via `.gitignore`)
├── .gitignore         ← protège les fichiers sensibles
├── README.md          ← ce fichier ✨
├── package.json       ← dépendances JS
├── package-lock.json  ← versions fixées



📦 Installation & Lancement
- Clonez le projet :
git clone https://github.com/LeMizoo/cast-site-1.git
- Ouvrez le dossier avec Visual Studio Code
- Créez le fichier firebase-config.js avec vos clés Firebase
- Lancez avec un serveur local (ex : Live Server ou via npx serve)

🔐 Sécurité
Les fichiers sensibles comme firebase-config.js ou .env sont exclus du suivi Git grâce au .gitignore.
Cela garantit que vos clés API et données privées ne seront pas publiées par erreur.

🌍 Déploiement
Le site est déployé sur Vercel — lien du projet à ajouter ici.
🕊️ Chaque mise en ligne est une bénédiction digitale.

🤝 Contribuer
Toute contribution est la bienvenue : amélioration du code, idées artistiques, optimisation Firebase ou enrichissement poétique.
Pour contribuer :
- Forkez le dépôt
- Créez une branche :
git checkout -b feature-nom
- Commitez vos changements
- Poussez la branche
- Ouvrez une Pull Request
✨ Chaque geste est une offrande 🙏

📜 Licence
Ce projet est sous licence MIT — libre d’être utilisé, modifié et partagé.
Tu es invité à en faire bon usage, dans l’esprit d’harmonie qu’il porte 💫

🇬🇧 English version
This README is also available in English: README.en.md
Ready to welcome the world into poetic code.
