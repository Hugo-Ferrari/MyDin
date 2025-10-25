import os
from dotenv import load_dotenv
import motor.motor_asyncio
import asyncio

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DB_NAME")

if not MONGODB_URL or not DB_NAME:
    raise RuntimeError("Variáveis de ambiente MONGODB_URL ou DB_NAME não definidas")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)

database = client[DB_NAME]


async def get_database() -> motor.motor_asyncio.AsyncIOMotorDatabase:
    return database

async def check_db_connection():
    try:
        await client.admin.command('ping')
        print(f"Conexão com o (banco: '{DB_NAME}') feita com sucesso.")
    except Exception as e:
        print(f"Falha ao conectar no banco de daos: {e}")
        print("Certifique de que o MongoDB está rodando em {MONGODB_URL}")