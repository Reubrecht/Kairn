# Fichier: kairn/backend/app/services/user_service.py
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .. import models, schemas
from . import profile_service

# Contexte pour le hachage des mots de passe
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def get_user_by_email(db: Session, email: str) -> models.User:
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    # Hache le mot de passe avant de le stocker
    hashed_password = get_password_hash(user.password)

    # Crée un objet modèle SQLAlchemy à partir des données du schéma
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password
   )
def authenticate_user(db: Session, email: str, password: str) -> models.User:
    user = get_user_by_email(db, email=email)
    if not user:
        return None
    if not security.verify_password(password, user.hashed_password):
        return None
    return user

# MODIFIE create_user pour utiliser la fonction de hachage de security.py
def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    # Ajoute l'objet à la session de la base de données
    db.add(db_user)
    # Valide la transaction pour l'écrire en base de données
    db.commit()
    # Rafraîchit l'objet pour obtenir les données générées par la BDD (comme l'ID)
    db.refresh(db_user)

    profile_service.create_profile(db=db, owner_id=db_user.id)
    return db_user

   def get_user(db: Session, user_id: int) -> models.User:
    """Récupère un utilisateur par son ID."""
    return db.query(models.User).filter(models.User.id == user_id).first() 