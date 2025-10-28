from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime

from database import get_database
from schemas import user_schema, token_schema
from utils import hash, jwt_handler

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/signup", response_model=user_schema.UserBase, status_code=status.HTTP_201_CREATED)
async def signup(user_data: user_schema.UserCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    try:
        existing_user = await db.users.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="E-mail já cadastrado")

        hashed_pass = hash.hash_password(user_data.password)

        new_user = {
            "name": user_data.name,
            "email": user_data.email,
            "hashed_password": hashed_pass,
            "roles": ["user"],
            "created_at": datetime.utcnow()
        }

        result = await db.users.insert_one(new_user)
        created_user = await db.users.find_one({"_id": result.inserted_id})
        if not created_user:
            raise HTTPException(status_code=500, detail="Erro ao criar usuário")

        created_user["_id"] = str(created_user["_id"])

        return user_schema.UserBase(**created_user)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")


@router.post("/login", response_model=token_schema.TokenResponse)
async def login(form_data: user_schema.UserLogin, db: AsyncIOMotorDatabase = Depends(get_database)):
    db_user = await db.users.find_one({"email": form_data.email})
    if not db_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="E-mail ou senha inválidos")

    if not hash.verify_password(form_data.password, db_user["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="E-mail ou senha inválidos")

    access_token = jwt_handler.create_access_token(
        data={"user_id": str(db_user["_id"]), "roles": db_user.get("roles", ["user"])}
    )

    return token_schema.TokenResponse(access_token=access_token)
