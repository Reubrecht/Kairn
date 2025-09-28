# Fichier: kairn/backend/app/services/user_service.py (Version Finale)
from sqlalchemy.orm import Session
from app.core import security
from .. import models, schemas
from . import profile_service

def get_user(db: Session, user_id: int) -> models.User:
    """Récupère un utilisateur par son ID."""
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> models.User:
    """Récupère un utilisateur par son email."""
    return db.query(models.User).filter(models.User.email == email).first()

def authenticate_user(db: Session, email: str, password: str) -> models.User:
    """Authentifie un utilisateur."""
    user = get_user_by_email(db, email=email)
    if not user:
        return None
    if not security.verify_password(password, user.hashed_password):
        return None
    return user

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    """Crée un nouvel utilisateur et son profil associé dans une seule transaction."""
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.flush()  # Assigne un ID à l'utilisateur sans commiter la transaction

    # Crée le profil associé sans commiter, pour l'inclure dans la même transaction
    profile_service.create_profile(db=db, owner_id=db_user.id, commit=False)

    db.commit()  # Commit atomique de l'utilisateur et du profil
    db.refresh(db_user)
    return db_user