from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from database import get_database
from schemas import user_schema, token_schema
from models import user_model
from utils import hash, jwt_handler
from routes.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/signup", response_model=user_schema.UserBase, status_code=status.HTTP_201_CREATED)
async def signup(user_data: user_schema.UserCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado.")
    
    hashed_pass = hash.hash_password(user_data.password)

    new_user = user_model.User(
        email=user_data.email,
        hashed_password=hashed_pass,
        name=user_data.name
    )

    result = await db.users.insert_one(new_user.dict(by_alias=True, exclude={"id"}))
    created_user = await db.users.find_one({"_id": result.inserted_id})

    if not created_user:
        raise HTTPException(status_code=500, detail="Erro ao criar usuário")

    created_user_dict = dict(created_user)
    created_user_dict["id"] = str(created_user_dict.pop("_id"))
    created_user_dict["roles"] = created_user_dict.get("roles") or ["user"]

    return user_schema.UserBase(**created_user_dict)


@router.post("/login", response_model=token_schema.TokenResponse)
async def login(form_data: user_schema.UserLogin, db: AsyncIOMotorDatabase = Depends(get_database)):
    db_user = await db.users.find_one({"email": form_data.email})
    if not db_user:
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos.")
    
    user = user_model.User(**db_user)
    
    if not hash.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos.")
    
    access_token = jwt_handler.create_access_token(
        data={"user_id": str(user.id), "roles": user.roles}
    )

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
