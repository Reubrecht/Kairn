# Fichier: kairn/backend/app/main.py

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text # IMPORT MANQUANT AJOUTÉ
from fastapi.middleware.cors import CORSMiddleware

from .api.v1.api import api_router
from .api.v1.deps import get_db

app = FastAPI(title="Kairn API")

# --- CONFIGURATION CORS ---
# Liste des origines autorisées à faire des requêtes vers notre API.
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Autorise toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"], # Autorise tous les headers
)
# --- FIN DE LA CONFIGURATION CORS ---

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"Project": "Kairn"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        # Utilise une syntaxe SQLAlchemy 2.0+ pour l'exécution
        db.execute(text("SELECT 1"))
        return {"status": "ok", "db_connection": "ok"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database connection error: {e}")