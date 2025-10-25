from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
import os

from database import check_db_connection, database, DB_NAME

load_dotenv()

app = FastAPI(
    title="API do MyDin",
    description="Setup básico e conexão com DB.",
    version="0.0.1"
)

origins = [
    "http://localhost",
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Eventos de Startup ---
@app.on_event("startup")
async def startup_db_client():
    await check_db_connection()

    await database.users.create_index("email", unique=True, sparse=True)
    print("Índice 'email' (teste) criado para a coleção 'users'.")

@app.get("/", tags=["Root"])
async def read_root():
    return {"status": "online", "message": "API do MyDin"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("inicio:app", host="127.0.0.1", port=port, reload=True)