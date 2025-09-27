# Fichier: kairn/backend/app/models/profile.py 
from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..db.base_class import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)

    # --- CATÉGORIE 1 : ANTHROPOMÉTRIE ---
    weight = Column(Float, nullable=True) # en kg
    height = Column(Integer, nullable=True) # en cm
    gender = Column(String, nullable=True)
    birthdate = Column(Date, nullable=True)

    # --- CATÉGORIE 2 : MARQUEURS PHYSIOLOGIQUES ---
    # Fréquence Cardiaque
    hr_max_manual = Column(Integer, nullable=True) # FC max (manuelle)
    hr_max_auto = Column(Integer, nullable=True) # FC max (calculée)
    hr_resting_manual = Column(Integer, nullable=True) # FC repos (manuelle)
    hr_resting_auto = Column(Integer, nullable=True) # FC repos (calculée)
    lthr_manual = Column(Integer, nullable=True) # Seuil lactique FC (manuel)
    lthr_auto = Column(Integer, nullable=True) # Seuil lactique FC (calculé)

    # Performance Course à Pied
    vma_manual = Column(Float, nullable=True) # VMA en km/h (manuelle)
    vma_auto = Column(Float, nullable=True) # VMA en km/h (calculée)
    tlim_vma_manual = Column(Integer, nullable=True) # Temps de soutien à VMA en secondes

    # Performance Cyclisme
    ftp_manual = Column(Integer, nullable=True) # FTP en watts (manuelle)
    ftp_auto = Column(Integer, nullable=True) # FTP en watts (calculée)

    # --- CATÉGORIE 3 : PROFIL D'ENDURANCE ET FATIGUE ---
    endurance_index_manual = Column(Float, nullable=True) # Indice d'Endurance (manuel)
    endurance_index_auto = Column(Float, nullable=True) # Indice d'Endurance (calculé)
    aerobic_coupling_avg = Column(Float, nullable=True) # Couplage aérobie moyen en %

    # --- CATÉGORIE 4 : PROFIL DE RÉCUPÉRATION ET PRÉPARATION ---
    hrv_rmssd_manual = Column(Integer, nullable=True) # Ligne de base VFC (rMSSD)
    hrv_rmssd_daily = Column(Integer, nullable=True) # VFC du jour (rMSSD)
    sleep_avg_duration = Column(Float, nullable=True) # Moyenne de sommeil en heures
    sleep_avg_score = Column(Integer, nullable=True) # Score de qualité de sommeil moyen

    # --- RELATION AVEC L'UTILISATEUR (OBLIGATOIRE) ---
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    owner = relationship("User", back_populates="profile", uselist=False)