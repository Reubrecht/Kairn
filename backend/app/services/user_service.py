# Fichier: kairn/backend/app/services/user_service.py
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .. import models, schemas

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

    # Ajoute l'objet à la session de la base de données
    db.add(db_user)
    # Valide la transaction pour l'écrire en base de données
    db.commit()
    # Rafraîchit l'objet pour obtenir les données générées par la BDD (comme l'ID)
    db.refresh(db_user)

    return db_user