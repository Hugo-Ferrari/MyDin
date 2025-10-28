from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
import os

from database import database
from routes import auth_routes
load_dotenv()

app = FastAPI(
    title="API do MyDin!",
    description="Implementado Signup e Login.",
    version="0.1.0", 
)
origins = [
    "http://localhost",
    "http://localhost:3000", 
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_routes.router)

@app.get("/")
def read_root():
    return {"message": "API do MyDin está online!", "version": app.version}

@app.on_event("startup")
async def startup_db_client():
    print("Iniciando conexão com o banco de dados e verificando índices...")
    try:
        await database.users.drop_index("email_1")
        print(" -> Índice 'email_1' obsoleto excluído com sucesso.")
    except Exception as e:
        if "index not found" in str(e) or "Index not found" in str(e):
             pass
        else:
             print(f" -> Aviso ao tentar excluir índice: {e}")
    try:
        await database.users.create_index("email", unique=True)
        print(" -> Índice 'email' (unique) criado/verificado com sucesso.")
    except Exception as e:
        print(f" -> ERRO FATAL na criação do índice: {e}")
        
    print("Startup concluído.")

if __name__ == "__main__":
    uvicorn.run("inicio:app", host="0.0.0.0", port=8000, reload=True)