from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

import os
from bson import ObjectId

from database import get_database
from schemas import user_schema, token_schema
from datetime import datetime, timedelta
from models import user_model
from utils import hash, jwt_handler
from utils.security import is_account_locked
from routes.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/login", response_model=token_schema.TokenResponse)
async def login(form_data: user_schema.UserLogin, db: AsyncIOMotorDatabase = Depends(get_database)):
    db_user = await db.users.find_one({"email": form_data.email})
    if not db_user:
        await db.login_attempts.insert_one({
            "email": form_data.email,
            "timestamp": datetime.utcnow(),
            "success": False
        })
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos.")

    user = user_model.User(**db_user)

    window = datetime.utcnow() - timedelta(minutes=int(os.getenv("FAILED_WINDOW_MINUTES", 15)))
    attempts_cursor = db.login_attempts.find({"email": user.email, "timestamp": {"$gte": window}})
    attempts = [a async for a in attempts_cursor]
    locked, minutes_left = is_account_locked(str(user.id), attempts)
    if locked:
        raise HTTPException(status_code=403, detail=f"Conta bloqueada temporariamente. Tente novamente em {minutes_left} minutos.")

    if not hash.verify_password(form_data.password, user.hashed_password):
        await db.login_attempts.insert_one({
            "user_id": ObjectId(str(user.id)),
            "email": user.email,
            "timestamp": datetime.utcnow(),
            "success": False
        })
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos.")

    await db.login_attempts.insert_one({
        "user_id": ObjectId(str(user.id)),
        "email": user.email,
        "timestamp": datetime.utcnow(),
        "success": True
    })

    access_token = jwt_handler.create_access_token(data={"user_id": str(user.id), "roles": user.roles})

    return token_schema.TokenResponse(
        access_token=access_token,
        token_type="bearer"
    )


@router.get("/me", response_model=user_schema.UserBase)
async def read_users_me(current_user: user_model.User = Depends(get_current_user)):
    return user_schema.UserBase(
        _id=str(current_user.id),
        email=current_user.email,
        name=current_user.name,
        roles=current_user.roles or ["user"],
        created_at=current_user.created_at
    )


@router.post("/logout")
async def logout():
    return {"detail": "Logout realizado com sucesso."}
