from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from utils.objectid import PyObjectId

class User(BaseModel):
    id: PyObjectId = Field(default_factory=lambda: ObjectId(), alias="_id")
    email: EmailStr = Field(...)
    hashed_password: str = Field(...)
    
    name: Optional[str] = None
    roles: List[str] = Field(default_factory=lambda: ["user"])
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True
        populate_by_name = True
        json_encoders = {ObjectId: str}
