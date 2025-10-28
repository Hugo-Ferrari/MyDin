from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorDatabase
from jose import JWTError
from bson import ObjectId

from database import get_database
from utils import jwt_handler
from models.user_model import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar o token.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        token_data = jwt_handler.decode_token(token)
        if token_data.user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await db.users.find_one({"_id": ObjectId(token_data.user_id)})
    if user is None:
        raise credentials_exception

    return User(**user)
