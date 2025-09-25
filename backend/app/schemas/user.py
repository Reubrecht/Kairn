# Fichier: kairn/backend/app/schemas/user.py

from pydantic import BaseModel, EmailStr
from typing import Optional

# --- Schéma de base ---
# Contient les champs communs, partagés par les autres schémas
class UserBase(BaseModel):
    email: EmailStr

# --- Schéma pour la création ---
# Hérite de UserBase et ajoute le mot de passe (uniquement à la création)
class UserCreate(UserBase):
    password: str

# --- Schéma pour la mise à jour ---
# Tous les champs sont optionnels pour la mise à jour
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None

# --- Schéma pour la lecture ---
# C'est ce que l'API renverra. Il exclut le mot de passe.
class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True # Permet de mapper directement depuis le modèle SQLAlchemy