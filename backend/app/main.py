# Fichier: kairn/backend/app/main.py

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.api import api_router
from app.core.config import settings
from app.db.session import SessionLocal

# Initialisation de l'application FastAPI
app = FastAPI(title=settings.PROJECT_NAME)

# Configuration des CORS (Cross-Origin Resource Sharing)
# Permet à votre frontend (tournant sur localhost:3000) de faire des requêtes à votre backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint de "vérification de santé" pour s'assurer que l'API et la BDD fonctionnent.
@app.get("/health")
def health_check(db: Session = Depends(SessionLocal)):
    try:
        # Fait une requête simple pour vérifier la connexion à la base de données.
        db.execute("SELECT 1")
        return {"status": "ok", "database": "connected"}
    except Exception:
        raise HTTPException(status_code=503, detail="Database connection error")

# Inclusion de toutes les routes de l'API définies dans api/v1/api.py
app.include_router(api_router, prefix=settings.API_V1_STR)