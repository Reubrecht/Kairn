## 🏔️ Kairn : Plateforme de Profilage d'Athlètes d'Endurance

**Kairn** est une plateforme web moderne et performante, conçue pour analyser en profondeur les données d'entraînement des athlètes d'endurance (course à pied, cyclisme, trail). Notre objectif est de transformer les données brutes en informations exploitables pour optimiser la performance et la gestion de la charge d'entraînement.

| Statut du Projet | Phase Actuelle | Licence |
| :--- | :--- | :--- |
| En développement actif | **Phase 1 : Backend de base et Authentification** | MIT |

---

### 🎯 Objectifs Clés

* **Profilage Avancé :** Calcul et visualisation de métriques complexes (charge d'entraînement, fatigue, forme physique).
* **Architecture Modulaire :** Séparation claire entre l'API et l'interface utilisateur pour une maintenance et une scalabilité maximales.
* **Visualisations Riches :** Utilisation de **D3.js** pour des graphiques interactifs et précis.
* **Performance :** Utilisation de Rust (via Python) pour les calculs intensifs (prévu en Phase 4) et de **Redis** pour le caching.

### ⚙️ Stack Technique

Nous avons choisi une stack **full-stack moderne et évolutive** :

| Domaine | Technologie | Rôle et Rationale |
| :--- | :--- | :--- |
| **Backend (API)** | **Python (FastAPI)** | Léger, très rapide, et idéal pour des applications asynchrones et des calculs scientifiques. |
| **Frontend (UI)** | **React (Next.js)** | Framework robuste pour le rendu côté serveur (SSR/SSG), garantissant performance et SEO. |
| **Bases de Données** | **PostgreSQL** | Base de données relationnelle éprouvée, offrant fiabilité et fonctionnalités avancées. |
| **Visualisation** | **D3.js** | La référence pour créer des visualisations de données personnalisées et de haute qualité. |
| **Infrastructure** | **Docker & Docker-Compose** | Environnement de développement portable et reproductible. |
| **Style** | **Tailwind CSS** | Approche utilitaire pour un développement front-end rapide et cohérent. |
| **Cache** | **Redis** | Pour le caching des sessions utilisateurs et des résultats de calculs fréquents. |

---

### 🛠️ Architecture du Projet

L'application est découpée en deux services principaux :

1.  **`backend/` (FastAPI) :**
    * Structure en couches (Routers, Services, CRUD, Modèles, Schémas) pour une logique métier isolée et testable.
    * Utilise **SQLAlchemy** et **Alembic** pour l'ORM et la gestion des migrations BDD.
2.  **`frontend/` (Next.js) :**
    * Utilise l'App Router pour une organisation claire des routes et des groupes.
    * Composants **React** et **D3.js** pour l'interface.

### 🚀 Démarrage Rapide (Environnement de Développement)

Le projet utilise **Docker Compose** pour orchestrer tous les services requis.

**Prérequis :**
* Docker Engine (ou Docker Desktop)
* Git

1.  **Cloner le dépôt :**
    ```bash
    git clone [VOTRE_LIEN_GITHUB] kairn
    cd kairn
    ```
2.  **Configurer l'environnement :**
    Créez un fichier `.env` à la racine basé sur les templates `backend/.env.example` et `frontend/.env.example`.
3.  **Lancer l'environnement :**
    ```bash
    docker-compose up --build
    ```
    *(Cette commande construit les images et lance le Backend, le Frontend, PostgreSQL et Redis.)*

| Service | Port Local |
| :--- | :--- |
| **Backend API** | `http://localhost:8000` |
| **Frontend App** | `http://localhost:3000` |
| **Documentation FastAPI (Swagger)** | `http://localhost:8000/docs` |

---

### 🚧 Progression et Étapes Suivantes

Nous avons validé la **Phase 1** (Backend, BDD et Authentification de base).

**Prochaines Étapes (Phase 2) :**

* Configuration de l'environnement Next.js/React.
* Implémentation de la page de connexion/inscription sur le Frontend.
* Connexion sécurisée entre le Frontend et l'API FastAPI (gestion des tokens JWT).

---

### Contribution

Nous encourageons les contributions ! N'hésitez pas à ouvrir des issues pour les bugs ou les suggestions de nouvelles fonctionnalités.

[**MIT License**](LICENSE)
