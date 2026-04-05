# SGBD — Application Electron

Application de bureau construite avec **Electron.js** regroupant plusieurs fonctionnalités : un compteur, un jeu de devinette de nombre, une météo en temps réel et un suivi des scores par joueur.

---

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm (inclus avec Node.js)

---

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/Ynotec/sgbd.git
cd sgbd/my-electron-app-js
```

2. Installer les dépendances :

```bash
npm install
```

---

## Lancer l'application

```bash
npm run start
```

L'application s'ouvre automatiquement dans une fenêtre de bureau.

---

## Fonctionnalités

### Compteur
Incrémente, décrémente ou remet à zéro un compteur partagé.

### Secret v1 - renderer
Devinez un nombre secret dans un intervalle configurable.
- Vous disposez d'un nombre de vies limité : 5.
- Le jeu vous indique si le nombre cherché est plus grand ou plus petit.
- En cas de victoire ou de défaite, pas de sauvegarde de la partie.

### Secret v2 - Ipc
- Vous disposez d'un nombre de vies limité (par défaut 5).
- Le jeu vous indique si le nombre cherché est plus grand ou plus petit.
- En cas de victoire ou de défaite, la partie est enregistrée dans votre profil.

### Météo
Consultez la météo actuelle :
- **Par nom de ville** : saisissez une ville dans le champ de recherche.
- **Par géolocalisation** : autorisez l'accès à votre position pour obtenir la météo locale.

Données fournies par [Open-Meteo](https://open-meteo.com/) (API gratuite, aucune clé requise).

### Profil & Scores
Consultez vos statistiques personnelles : nombre de victoires, défaites et historique des parties.
Les scores sont sauvegardés localement dans `data/scores.json`.

### Paramètres
Configurez votre nom de joueur, l'intervalle du jeu (min/max) et le nombre de vies avant de jouer pour le jeu Secret V2

---

## Structure du projet

```
my-electron-app-js/
├── data/
│   └── scores.json          # Sauvegarde locale des scores
├── src/
│   ├── main/
│   │   └── main.js          # Processus principal Electron
│   ├── preload/
│   │   └── preload.js       # Bridge sécurisé entre main et renderer
│   ├── renderer/
│   │   ├── index.html       # Interface principale
│   │   ├── renderer.js      # Logique du renderer
│   │   ├── styles.css
│   │   └── sections/        # Modules UI (compteur, météo, jeu…)
│   └── service/
│       ├── GuessService.js      # Logique du jeu de devinette
│       ├── MeteoApiService.js   # Appels API météo
│       └── ScoreService.js      # Lecture/écriture des scores
└── package.json
```
