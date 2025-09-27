# Fichier: kairn/backend/app/schemas/profile.py
from pydantic import BaseModel
from typing import Optional
from datetime import date

# --- Schéma de base avec les champs modifiables par l'utilisateur ---
class ProfileBase(BaseModel):
    weight: Optional[float] = None
    height: Optional[int] = None
    gender: Optional[str] = None
    birthdate: Optional[date] = None

    hr_max_manual: Optional[int] = None
    hr_resting_manual: Optional[int] = None
    lthr_manual: Optional[int] = None

    vma_manual: Optional[float] = None
    tlim_vma_manual: Optional[int] = None

    ftp_manual: Optional[int] = None

    endurance_index_manual: Optional[float] = None

# --- Schéma pour la création (identique à la base pour l'instant) ---
class ProfileCreate(ProfileBase):
    pass

# --- Schéma pour la mise à jour (identique à la base) ---
class ProfileUpdate(ProfileBase):
    pass

# --- Schéma pour la lecture (ce que l'API renverra) ---
# Il inclut TOUS les champs, y compris ceux calculés par le système.
class Profile(ProfileBase):
    id: int
    owner_id: int

    hr_max_auto: Optional[int] = None
    hr_resting_auto: Optional[int] = None
    lthr_auto: Optional[int] = None

    vma_auto: Optional[float] = None
    ftp_auto: Optional[int] = None

    endurance_index_auto: Optional[float] = None
    aerobic_coupling_avg: Optional[float] = None

    hrv_rmssd_manual: Optional[int] = None
    hrv_rmssd_daily: Optional[int] = None
    sleep_avg_duration: Optional[float] = None
    sleep_avg_score: Optional[int] = None

    class Config:
        from_attributes = True