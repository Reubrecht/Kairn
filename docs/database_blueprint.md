Blueprint de la Base de Données Kairn : Une Approche Scientifique et FlexibleCe document détaille l'architecture de la base de données conçue pour l'application Kairn, spécialisée dans le profilage de performance pour les athlètes de trail running. Le principe directeur de cette structure est le profilage progressif : l'application doit être immédiatement fonctionnelle avec un minimum de données, tout en s'enrichissant et en affinant ses analyses à mesure que l'utilisateur fournit des informations complémentaires.L'objectif est de créer un véritable jumeau numérique de l'athlète, capable de modéliser ses performances, d'identifier ses forces et faiblesses, et d'optimiser sa charge d'entraînement.Catégorie 1 : Profil Anthropométrique et BiométriqueCaractéristiques physiques fondamentales de l'athlète, socle de toute analyse personnalisée.DonnéeStatutJustification ScientifiquePoids (Weight)RecommandéEssentiel pour le calcul de métriques relatives clés comme la puissance relative (W/kg) ou la VMA relative.% Masse GrasseAvancéFournit un indicateur précis de la composition corporelle, permettant de suivre l'évolution de la masse maigre.Date de NaissanceFondamentalIndispensable pour la segmentation par catégories d'âge et l'application de formules prédictives liées à l'âge.Sexe BiologiqueFondamentalNécessaire pour garantir la pertinence des analyses comparatives et des modèles de performance.Catégorie 2 : Marqueurs de Performance PhysiologiquesCes données définissent le "moteur" de l'athlète. Elles sont toutes optionnelles mais permettent d'affiner radicalement la précision du profilage.DonnéeStatutJustification ScientifiqueFC MaximaleRecommandéIndispensable pour calibrer avec précision les zones d'entraînement basées sur la fréquence cardiaque.FC au ReposRecommandéReflet direct de la forme aérobie de base et de la qualité de la récupération.VMARecommandéMarqueur de référence de la puissance aérobie, utilisé pour calibrer les allures d'entraînement sur terrain plat.VAM (Vitesse Asc.)NouveauMÉTRIQUE CLÉ DU TRAIL. Mesure la capacité en montée (en m/h), un facteur de performance déterminant dans la discipline.Seuil Anaérobie (LT2)AvancéPoint de bascule métabolique. L'entraînement à ce seuil est reconnu comme la méthode la plus efficace pour améliorer l'endurance.Indice d'EnduranceNouveauMesure la capacité à soutenir un haut pourcentage de VMA sur une longue durée. Permet de profiler l'athlète sur un axe "endurant" vs "rapide".FTP (Cyclisme)OptionnelPertinent uniquement pour les athlètes pratiquant le cyclisme en cross-training afin d'intégrer la charge de ces entraînements.Catégorie 3 : Données d'Activité et de TerrainAnalyse détaillée de chaque sortie. La richesse des données collectées dépend des capteurs dont dispose l'utilisateur.Métadonnées de Baseid_usertype_sportdateduréedistancedénivelé+/-Données Time-Series (par seconde)TimestampGPS (Latitude, Longitude, Altitude)Fréquence CardiaqueVitesseDonnées Avancées (issues de capteurs spécifiques)Puissance en Course à Pied : Ajout crucial pour mesurer l'intensité de l'effort de manière objective, indépendamment du terrain.Dynamiques de Course : Temps de contact au sol, Oscillation verticale, etc. Utiles pour analyser l'efficience de la foulée et sa dégradation avec la fatigue.Données Contextuelles (calculées ou via API)Météo : Température, Humidité. Permet de contextualiser la performance (ex: analyser la dérive cardiaque par temps chaud).Pente du segment (%) : Calculée à partir des données GPS pour isoler et analyser les performances spécifiques en montée, sur le plat et en descente.Type de terrain : Catégorisation (ex: "Route", "Piste", "Technique") pour identifier les forces et faiblesses spécifiques à chaque surface.Catégorie 4 : Marqueurs de Fatigue, Charge et RécupérationCette section est dédiée à l'évaluation de l'état de préparation de l'athlète, un pilier de la prévention du surentraînement.DonnéeStatutJustification ScientifiqueCharge d'entraînementCalculéeUn score (ex: TRIMP, TSS) quantifie l'impact physiologique de chaque séance et permet de suivre la charge chronique et aiguë.Couplage AérobieNouveauIndicateur de fatigue clé en trail. Mesure la dérive cardiaque à effort constant sur les sorties longues. Un découplage élevé signe un manque d'endurance.VFC / HRVAvancéReflet direct de l'état du système nerveux autonome. C'est un indicateur précoce et fiable de la fatigue et de la disponibilité à l'entraînement.Données SubjectivesNouveauNotes sur le sommeil, le niveau de stress, les douleurs, et le RPE (perception de l'effort). La recherche valide que le ressenti de l'athlète est aussi prédictif que les données objectives.Synthèse Stratégique et RecommandationsCe blueprint n'est pas une simple structure de stockage ; il constitue l'architecture d'un puissant outil d'analyse et d'aide à la décision.1. Potentiel PrédictifAvec cette structure de données, Kairn sera en mesure de développer des modèles de prédiction de temps de course d'une précision redoutable. En soumettant un fichier GPX, le modèle pourra le segmenter et appliquer le profil de performance unique de l'athlète à chaque segment (sa VAM pour les montées, son allure sur le plat), tout en intégrant un facteur de dégradation de la performance basé sur son indice d'endurance.2. Diagnostic des Forces et FaiblessesL'application pourra générer des analyses automatiques et actionnables :"Votre profil montre que vous êtes 15% plus efficient que les athlètes de votre niveau dans les montées techniques (>20%), mais vous perdez du temps dans les descentes peu techniques (-5% à -10%). Voici des axes de travail pour corriger cela."3. Gestion Intelligente de l'EntraînementEn croisant la charge d'entraînement calculée, les indicateurs de fatigue objectifs (VFC, Couplage Aérobie) et le ressenti subjectif, Kairn deviendra un véritable assistant-coach. Il sera capable de suggérer des jours de repos, de moduler l'intensité des séances planifiées et d'optimiser l'équilibre entre effort et récupération pour une progression durable.Exemples d'Implémentation TechniqueCette section présente des exemples de code concrets pour implémenter le blueprint décrit ci-dessus avec différentes technologies de bases de données.Option 1 : Schéma SQL (PostgreSQL)Approche structurée, idéale pour la cohérence des données et les requêtes analytiques complexes.-- Catégorie 1 & 2: Profil de l'Athlète
CREATE TABLE athletes (
    id_user SERIAL PRIMARY KEY,
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date_de_naissance DATE NOT NULL,
    sexe_biologique VARCHAR(10) NOT NULL,
    poids_kg NUMERIC(5, 2),
    pourcentage_masse_grasse NUMERIC(4, 2),
    fc_maximale INTEGER,
    fc_repos INTEGER,
    vma_kmh NUMERIC(4, 2),
    vam_mh INTEGER,
    seuil_anaerobie_bpm INTEGER,
    indice_endurance NUMERIC(4, 2),
    ftp_cyclisme_watts INTEGER
);

-- Catégorie 3: Métadonnées d'Activité
CREATE TABLE activities (
    id_activity SERIAL PRIMARY KEY,
    id_user INTEGER REFERENCES athletes(id_user) ON DELETE CASCADE,
    type_sport VARCHAR(50) NOT NULL,
    date_activite TIMESTAMP WITH TIME ZONE NOT NULL,
    duree_secondes INTEGER NOT NULL,
    distance_metres NUMERIC(10, 2),
    denivele_positif_metres INTEGER,
    denivele_negatif_metres INTEGER,
    meteo_temperature_celsius NUMERIC(4, 1),
    meteo_humidite_pourcentage NUMERIC(4, 1),
    rpe_subjectif INTEGER,
    note_sommeil INTEGER,
    niveau_stress INTEGER,
    commentaires TEXT
);

-- Catégorie 3: Données Time-Series
CREATE TABLE activity_timeseries (
    id_timeseries BIGSERIAL PRIMARY KEY,
    id_activity INTEGER REFERENCES activities(id_activity) ON DELETE CASCADE,
    "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL,
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    altitude_metres NUMERIC(6, 2),
    vitesse_ms NUMERIC(5, 2),
    frequence_cardiaque_bpm INTEGER,
    puissance_watts INTEGER,
    temps_contact_sol_ms INTEGER,
    oscillation_verticale_cm NUMERIC(4, 2)
);

-- Catégorie 4: Marqueurs de Charge et Fatigue
CREATE TABLE training_load (
    id_load SERIAL PRIMARY KEY,
    id_activity INTEGER REFERENCES activities(id_activity) ON DELETE CASCADE,
    id_user INTEGER REFERENCES athletes(id_user) ON DELETE CASCADE,
    date_calcul TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    trimp_score NUMERIC(8, 2),
    couplage_aerobie_pourcentage NUMERIC(5, 2),
    hrv_rmssd NUMERIC(5, 2)
);

-- Index pour accélérer les requêtes
CREATE INDEX idx_activities_user_date ON activities (id_user, date_activite DESC);
CREATE INDEX idx_timeseries_activity ON activity_timeseries (id_activity);
Option 2 : Structure NoSQL (Documents JSON / MongoDB)Approche flexible, performante pour lire toutes les données d'une entité (un athlète, une activité) en une seule opération.Collection users{
  "_id": "ObjectId('user123')",
  "date_creation": "2025-09-27T17:30:00Z",
  "profil_anthropometrique": {
    "date_de_naissance": "1990-05-15",
    "sexe_biologique": "Homme",
    "historique_poids": [
      { "date": "2025-09-01", "valeur_kg": 70.5 },
      { "date": "2025-08-01", "valeur_kg": 71.2 }
    ]
  },
  "marqueurs_physiologiques": {
    "fc_maximale": 190,
    "fc_repos": 45,
    "vma_kmh": 18.5,
    "vam_mh": 1100,
    "seuil_anaerobie_bpm": 172
  }
}
Collection activities{
  "_id": "ObjectId('activity456')",
  "id_user": "ObjectId('user123')",
  "type_sport": "Trail",
  "date_activite": "2025-09-27T08:00:00Z",
  "metadata": {
    "duree_secondes": 7200,
    "distance_metres": 18500,
    "denivele_positif_metres": 850
  },
  "analyse_performance": {
    "charge_entrainement": {
      "trimp_score": 150
    },
    "fatigue": {
      "couplage_aerobie_pourcentage": 4.5
    }
  },
  "timeseries": [
    {
      "timestamp_offset": 0,
      "latitude": 42.49501,
      "longitude": 2.96912,
      "vitesse_ms": 3.5,
      "fc_bpm": 130
    },
    {
      "timestamp_offset": 1,
      "latitude": 42.49504,
      "longitude": 2.96915,
      "vitesse_ms": 3.6,
      "fc_bpm": 131
    }
  ]
}
