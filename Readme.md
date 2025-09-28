# Kairn - Plateforme de Profilage pour Athlètes

![Logo Kairn](https://github.com/Reubrecht/Kairn/blob/main/kairn_logo.png)

> **Plateforme de profilage pour athlètes d'endurance, spécialisée dans le trail running.**

Kairn est une application web full-stack conçue pour être un jumeau numérique de l'athlète d'endurance. Notre objectif est de traduire la science du sport en un outil intelligent pour l'analyse, la prédiction de performance et la gestion de l'entraînement.

---

## ✨ Vision du Projet

### 🔬 Diagnostic Scientifique
Analyser les forces et faiblesses en fonction du terrain et de la distance.

### 🤖 Modélisation de la Fatigue
Prédire l'état de préparation à l'effort via des indicateurs objectifs (VFC) et subjectifs.

### 📈 Prédiction de Performance
Estimer les temps de course sur des parcours spécifiques en se basant sur le profil unique de l'athlète.

---

## 💻 Stack Technique

L'application est entièrement conteneurisée avec **Docker** pour garantir un environnement de développement et de production cohérent et reproductible.

![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🚀 Démarrage Rapide

### Prérequis
* **Git**
* **Docker & Docker Compose**
* Un environnement de type **Linux** (WSL 2 sur Windows est recommandé)

### Étapes d'installation

1.  **Cloner le dépôt :**
    ```bash
    git clone [https://github.com/Reubrecht/Kairn.git](https://github.com/Reubrecht/Kairn.git)
    cd Kairn
    ```

2.  **Configurer l'environnement :**
    Créez une copie du fichier d'exemple `.env.example` et nommez-la `.env`. Ce fichier contient les variables d'environnement nécessaires pour connecter les services entre eux. Les valeurs par défaut sont pré-configurées pour un environnement de développement local.
    ```bash
    cp .env.example .env
    ```

3.  **Lancer l'application :**
    Cette commande unique construit les images Docker et démarre tous les services en arrière-plan.
    ```bash
    docker compose up --build -d
    ```

### Accéder aux services

* **Frontend (Application)** : ➡️ [http://localhost:3000](http://localhost:3000)
* **Backend (Documentation API)** : ➡️ [http://localhost:8000/docs](http://localhost:8000/docs)

---

Pour en savoir plus sur l'architecture, la vision scientifique et les conventions du projet, consultez le **Wiki du projet**.
