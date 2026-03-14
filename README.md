<p align="center">
	<img src="assets/logo.png" alt="Cultur'O'Guides Logo" width="260" />
</p>

<p align="center">
	<img src="https://flagcdn.com/w40/dz.png" width="24" alt="Algérie" title="Algérie" />
	<img src="https://flagcdn.com/w40/bj.png" width="24" alt="Bénin" title="Bénin" />
	<img src="https://flagcdn.com/w40/br.png" width="24" alt="Brésil" title="Brésil" />
	<img src="https://flagcdn.com/w40/bf.png" width="24" alt="Burkina Faso" title="Burkina Faso" />
	<img src="https://flagcdn.com/w40/bi.png" width="24" alt="Burundi" title="Burundi" />
	<img src="https://flagcdn.com/w40/ca.png" width="24" alt="Canada" title="Canada" />
	<img src="https://flagcdn.com/w40/ci.png" width="24" alt="Côte d'Ivoire" title="Côte d'Ivoire" />
	<img src="https://flagcdn.com/w40/fr.png" width="24" alt="France" title="France" />
	<img src="https://flagcdn.com/w40/gn.png" width="24" alt="Guinée" title="Guinée" />
	<img src="https://flagcdn.com/w40/in.png" width="24" alt="Inde" title="Inde" />
	<img src="https://flagcdn.com/w40/ma.png" width="24" alt="Maroc" title="Maroc" />
	<img src="https://flagcdn.com/w40/mx.png" width="24" alt="Mexique" title="Mexique" />
	<img src="https://flagcdn.com/w40/ng.png" width="24" alt="Nigeria" title="Nigeria" />
	<img src="https://flagcdn.com/w40/cd.png" width="24" alt="RDC" title="RDC" />
	<img src="https://flagcdn.com/w40/ch.png" width="24" alt="Suisse" title="Suisse" />
	<img src="https://flagcdn.com/w40/tg.png" width="24" alt="Togo" title="Togo" />
</p>

# Cultur'O'Guides

**Le jeu interactif ultime pour célébrer la Francophonie chez les Google Local Guides.**

## Contexte du Projet

Cultur'O'Guides est une Single Page Application (SPA) développée spécifiquement pour la session "Let's Celebrate Francophonie" de la communauté internationale des Google Local Guides.

Ce projet vise à rassembler, éduquer et divertir les membres en testant leurs connaissances sur la culture, la géographie, les lieux d'exception et les expressions linguistiques des différents pays partageant l'usage de la langue française ou liés à la communauté francophone.

## Fonctionnalités Principales

- Expérience de jeu immersive: interface "Wood UI", effets sonores, musique d'ambiance chill, animations fluides.
- Chronomètre intégré: sessions de 1 minute 30 secondes pour répondre à 10 questions.
- Génération de carte de score: image 16:9 en PNG, prête au partage.
- Leaderboard mondial et podium: classement dynamique avec mise en avant du Top 3.
- Système anti-triche et limite de session:
	- pseudo unique par joueur
	- limite de 2 tentatives par heure (cache local + verrou serveur Apps Script)
	- écrasement du score précédent lors d'une nouvelle tentative
- Avatars dynamiques: génération automatique via DiceBear API.

## Pays Représentés

L'application couvre 16 pays membres ou invités de la communauté francophone:

| Drapeau | Pays |
|---|---|
| <img src="https://flagcdn.com/w40/dz.png" width="24" alt="Algérie" /> | Algérie |
| <img src="https://flagcdn.com/w40/bj.png" width="24" alt="Bénin" /> | Bénin |
| <img src="https://flagcdn.com/w40/br.png" width="24" alt="Brésil" /> | Brésil |
| <img src="https://flagcdn.com/w40/bf.png" width="24" alt="Burkina Faso" /> | Burkina Faso |
| <img src="https://flagcdn.com/w40/bi.png" width="24" alt="Burundi" /> | Burundi |
| <img src="https://flagcdn.com/w40/ca.png" width="24" alt="Canada" /> | Canada |
| <img src="https://flagcdn.com/w40/ci.png" width="24" alt="Côte d'Ivoire" /> | Côte d'Ivoire |
| <img src="https://flagcdn.com/w40/fr.png" width="24" alt="France" /> | France |
| <img src="https://flagcdn.com/w40/gn.png" width="24" alt="Guinée" /> | Guinée |
| <img src="https://flagcdn.com/w40/in.png" width="24" alt="Inde" /> | Inde |
| <img src="https://flagcdn.com/w40/ma.png" width="24" alt="Maroc" /> | Maroc |
| <img src="https://flagcdn.com/w40/mx.png" width="24" alt="Mexique" /> | Mexique |
| <img src="https://flagcdn.com/w40/ng.png" width="24" alt="Nigeria" /> | Nigeria |
| <img src="https://flagcdn.com/w40/cd.png" width="24" alt="RDC" /> | RDC |
| <img src="https://flagcdn.com/w40/ch.png" width="24" alt="Suisse" /> | Suisse |
| <img src="https://flagcdn.com/w40/tg.png" width="24" alt="Togo" /> | Togo |

## Technologies Utilisées

Ce projet repose sur une architecture serverless légère, utilisant des technologies web modernes et des API tierces.

<div align="center">
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
	<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
	<img src="https://img.shields.io/badge/Google_Apps_Script-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Apps Script" />
</div>

- Frontend: Vanilla JS, HTML5, CSS3, Tailwind CSS (CDN).
- Backend / base de données: Google Sheets + Google Apps Script (API REST).
- Bibliothèques externes:
	- html2canvas (capture carte score)
	- canvas-confetti (animation victoire)
	- Lucide Icons (iconographie)
	- DiceBear API + FlagCDN (avatars et drapeaux)

## Architecture et Flux de Données

- Client (navigateur): toute la logique du jeu s'exécute côté client (SPA).
- localStorage: gestion de session (1h) et limite de tentatives (2 essais/heure).
- Backend via Fetch API: communication asynchrone avec le Web App Endpoint Google Apps Script.
- Google Sheets:
	- `doGet(action=leaderboard)`: renvoie les joueurs triés pour alimenter le leaderboard.
	- `doGet(action=user)`: recherche un joueur par pseudo.
	- `doGet(action=attempt)`: réserve une tentative côté serveur avec fenêtre de 1h.
	- `doGet(action=upsert)` ou `doPost()`: crée ou met à jour le joueur et son score.

## Règle des Tentatives (1 Heure)

- Chaque pseudo dispose de **2 tentatives maximum** sur une **fenêtre glissante de 1 heure**.
- La fenêtre démarre au **moment de la première tentative** validée.
- Exemple: si la première tentative est lancée à 14:10, les 2 tentatives sont comptées jusqu'à 15:10.
- À partir de 15:10, le compteur repart à zéro automatiquement.
- Le contrôle est fait à deux niveaux:
	- côté navigateur (cache local) pour fluidifier l'expérience,
	- côté serveur Apps Script (source d'autorité) pour empêcher les contournements simples.

## Architecture du Projet

La structure est organisée pour une lecture rapide, avec séparation claire frontend / assets / config:

```text
CulturOGuides/
├── apps-script/
│   └── Code.gs
├── assets/
│   └── logo.png
├── src/
│   ├── script.js
│   └── style.css
├── index.html
├── README.md
├── vercel.json
└── .nojekyll
```

## Exécuter le projet en local

L'application est plug and play.

1. Prérequis
- Un navigateur moderne (Chrome, Firefox, Edge, Safari).
- Un compte Google si vous voulez brancher votre propre leaderboard.

2. Lancer le frontend
- Cloner le dépôt:

```bash
git clone https://github.com/glosings0n/CulturOGuides.git
```

- Ouvrir le dossier du projet.
- Ouvrir index.html dans le navigateur, ou utiliser Live Server dans VS Code.

3. Configurer le backend (Google Sheets)
- Créer un Google Sheet.
- Nommer la feuille Scores.
- Ajouter les en-têtes de A à E: Username, Country, Emoji, Avatar, Score.
- Aller dans Extensions > Apps Script.
- Coller le script backend disponible dans [apps-script/Code.gs](apps-script/Code.gs).
- Déployer en Web App:
	- Exécuter en tant que: Moi
	- Accès: Tout le monde
- Copier l'URL Web App.
- Dans `src/script.js`, remplacer la constante `GOOGLE_SHEET_URL` par votre URL.

4. Notes backend importantes
- Le script crée automatiquement une feuille `Attempts` si elle n'existe pas.
- Cette feuille stocke la fenêtre d'1 heure et le nombre de tentatives consommées par pseudo.
- Le frontend garde encore un cache navigateur de 1 heure pour éviter les requêtes inutiles, mais le serveur devient l'autorité finale sur les 2 tentatives.
- Si le serveur n'est pas joignable, le lancement d'une partie est bloqué pour éviter les désynchronisations de quota en production.

## Comment Contribuer

Les contributions sont les bienvenues.

1. Forker le projet: https://github.com/glosings0n/CulturOGuides
2. Créer une branche:

```bash
git checkout -b feature/AjoutNouvellesQuestions
```

3. Commiter vos changements:

```bash
git commit -m "Ajout de 10 questions sur la géographie"
```

4. Pousser la branche:

```bash
git push origin feature/AjoutNouvellesQuestions
```

5. Ouvrir une Pull Request.

<div align="center">
	<hr />
	<i>Un projet pensé, conçu et développé avec passion pour la communauté.</i>
	<br /><br />
	<b>Communauté locale et internationale 💙</b>
	<br /><br />
	<b>Jeu développé par <a href="https://linktr.ee/glosings0n" target="_blank" rel="noopener noreferrer">@glosings0n</a></b>
</div>
