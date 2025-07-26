# 🌟 CAST — Chœur Artistique & Spirituel de Tanà

Ce projet web présente le Chœur Artistique & Spirituel de Tanà à travers un site statique HTML/JavaScript hébergé sur Vercel. Il met en valeur les valeurs du chœur, ses créations, ses inspirations et offre un espace membre sécurisé.

---

## 🗂️ Arborescence du projet
📁 cast-site/
├── index.html                  → Page d'accueil
├── presentation.html           → Présentation du projet
├── inspiration.html            → Contenu inspirant
├── gallery.html                → Galerie d'images
├── engagements.html            → Valeurs et engagements
├── espace-membre.html          → Tableau de bord sécurisé
├── contact.html                → Formulaire de contact
└── assets/
    ├── audio/                  → Fichiers audio du chœur
    ├── css/
    │   ├── poesie.css          → Styles dédiés aux pages poétiques
    │   └── style.css           → Styles principaux du site
    ├── js/
    │   ├── authForms.js        → Gestion des formulaires d'authentification
    │   ├── dashboard-scripts.js → Scripts du tableau de bord
    │   ├── espace-membre.js    → Logique d’interaction de l’espace membre
    │   ├── firebase-auth.js    → Intégration Firebase (login Google/Facebook)
    │   ├── header-footer.js    → Insertion dynamique du header et du footer
    │   ├── member-loader.js    → Chargement des données utilisateur
    │   ├── profil.js           → Interface de gestion du profil
    │   └── scripts.js          → Logique générale et améliorations UX
    ├── images/                 → Médias visuels du chœur
    └── videos/                 → Contenus vidéo inspirants


---

## 🔐 Fonctionnalités clés

- **Responsive design** pour toutes tailles d’écrans
- **Modularisation JS** pour meilleure maintenabilité
- **Authentification Firebase** : login via email, Google, Facebook
- **Validation avancée** des formulaires (`email`, `mot de passe`, `confirmation`)
- **Insertion dynamique** des composants communs (`header`, `footer`)
- **Déploiement sur Vercel** avec structure HTML/JS statique

---

## 🚧 À venir

- Pages additionnelles : `engagement.html`, `inspiration.html`, `contact.html`, `gallery.html`
- Intégration de **Firestore** pour gestion enrichie des membres
- Amélioration du style (`poesie.css`) pour cohérence artistique

---

## 🤝 Contributeur principal

**Tovoniaina** — développeur passionné par l’harmonie entre esthétique et fonctionnalité web.

---

## 📁 Remarques

Ce dépôt a été nettoyé des anciennes dépendances (PHP, Node.js) pour s’aligner sur le déploiement statique. Le dossier `cast-site` contient uniquement les éléments pertinents au projet actuel.
