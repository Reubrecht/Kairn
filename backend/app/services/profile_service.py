# Fichier: kairn/backend/app/services/profile_service.py
from sqlalchemy.orm import Session
from typing import Any, Dict, Union

from app import models, schemas

def get_profile_by_owner_id(db: Session, owner_id: int) -> models.Profile:
    """Récupère le profil d'un utilisateur par son ID."""
    return db.query(models.Profile).filter(models.Profile.owner_id == owner_id).first()

def create_profile(db: Session, owner_id: int, commit: bool = True) -> models.Profile:
    """
    Crée un profil vide pour un nouvel utilisateur.
    Le commit est optionnel pour permettre l'intégration dans des transactions plus larges.
    """
    db_profile = models.Profile(owner_id=owner_id)
    db.add(db_profile)
    if commit:
        db.commit()
        db.refresh(db_profile)
    return db_profile

def update_profile(
    db: Session,
    *,
    db_obj: models.Profile,
    obj_in: Union[schemas.ProfileUpdate, Dict[str, Any]]
) -> models.Profile:
    """Met à jour le profil d'un utilisateur."""
    if isinstance(obj_in, dict):
        update_data = obj_in
    else:
        # Exclut les valeurs non définies pour ne mettre à jour que ce qui est fourni
        update_data = obj_in.dict(exclude_unset=True)

    # Applique les nouvelles valeurs à l'objet de la base de données
    for field, value in update_data.items():
        setattr(db_obj, field, value)

    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj