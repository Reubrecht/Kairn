# Fichier: kairn/backend/app/api/v1/deps.py (Version Finale)
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app import models, schemas, services
from app.core import security
from app.db import session

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl="/api/v1/users/login/access-token"
)

def get_db():
    db = session.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> models.User:
    try:
        payload = jwt.decode(
            token, security.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = schemas.TokenData(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = services.user_service.get_user(db, user_id=token_data.id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user