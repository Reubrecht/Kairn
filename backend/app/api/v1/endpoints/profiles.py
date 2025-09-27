# Fichier: kairn/backend/app/api/v1/endpoints/profiles.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas, services
from app.api.v1 import deps

router = APIRouter()

@router.get("/me", response_model=schemas.Profile)
def read_profile_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """
    Récupère le profil de l'utilisateur actuellement connecté.
    """
    profile = services.profile_service.get_profile_by_owner_id(db, owner_id=current_user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/me", response_model=schemas.Profile)
def update_profile_me(
    *,
    db: Session = Depends(deps.get_db),
    profile_in: schemas.ProfileUpdate,
    current_user: models.User = Depends(deps.get_current_user),
):
    """
    Met à jour le profil de l'utilisateur actuellement connecté.
    """
    profile = services.profile_service.get_profile_by_owner_id(db, owner_id=current_user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    profile = services.profile_service.update_profile(db=db, db_obj=profile, obj_in=profile_in)
    return profile