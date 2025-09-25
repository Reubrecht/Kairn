# Fichier: kairn/backend/app/main.py (Version Finale et Correcte)

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

# On importe uniquement ce dont on a besoin
from .api.v1.api import api_router
from .api.v1.deps import get_db

app = FastAPI(title="Kairn API")

# La fonction get_db() a été SUPPRIMÉE de ce fichier.
# Elle se trouve maintenant dans deps.py

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"Project": "Kairn"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"status": "ok", "db_connection": "ok"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database connection error: {e}")