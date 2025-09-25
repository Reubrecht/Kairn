# Fichier: kairn/backend/app/api/v1/endpoints/users.py (Version Finale)

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import services
from app.schemas.user import User, UserCreate
from app.api.v1.deps import get_db

router = APIRouter()

@router.post("/", response_model=User, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Vérifie si un utilisateur avec cet email existe déjà
    db_user = services.user_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Appelle le service pour créer l'utilisateur
    return services.user_service.create_user(db=db, user=user)