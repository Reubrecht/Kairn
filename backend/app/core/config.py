# Fichier: kairn/backend/app/core/config.py

import os
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings
from typing import List

# Cette classe utilise Pydantic pour valider et charger votre configuration
# depuis les variables d'environnement (et votre fichier .env).
class Settings(BaseSettings):
    # Le nom de votre projet, utilisé par exemple dans la documentation de l'API.
    # Il a une valeur par défaut au cas où il ne serait pas dans le .env.
    PROJECT_NAME: str = "Kairn Athlete Profiler"

    # Le préfixe pour toutes les routes de l'API version 1.
    API_V1_STR: str = "/api/v1"
    
    # Une clé secrète forte pour signer les tokens JWT.
    # !! DOIT être définie dans votre fichier .env !!
    SECRET_KEY: str
    
    # Durée de validité d'un token d'accès en minutes.
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 jours

    # Configuration de la connexion à la base de données PostgreSQL.
    # Ces variables doivent être définies dans votre fichier .env.
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    
    # Propriété calculée qui construit l'URL de connexion complète pour SQLAlchemy.
    # C'est une bonne pratique pour ne pas avoir à la reconstruire partout dans le code.
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}/{self.POSTGRES_DB}"

    # Configuration des CORS (Cross-Origin Resource Sharing).
    # Permet à des domaines spécifiques (votre frontend) de faire des requêtes à cette API.
    # !! DOIT être défini dans votre fichier .env !!
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    class Config:
        # Pydantic lira les variables d'environnement en respectant la casse.
        case_sensitive = True
        # Spécifie le fichier à utiliser pour charger les variables d'environnement.
        env_file = ".env"

# Crée une instance unique de la configuration.
# Vous importerez cet objet `settings` dans les autres fichiers de votre application
# pour accéder à n'importe quelle variable de configuration.
settings = Settings()