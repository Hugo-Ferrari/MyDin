from typing import Any, Annotated
from bson import ObjectId
from pydantic import BeforeValidator, PlainSerializer, Field
from pydantic_core import PydanticCustomError

def validate_objectid(value: Any) -> ObjectId:
    
    if isinstance(value, ObjectId):
        return value
    
    if isinstance(value, str):
        if not ObjectId.is_valid(value):
            raise PydanticCustomError('objectid_invalid', 'Invalid ObjectId format')
        return ObjectId(value)

    raise PydanticCustomError('objectid_invalid', 'ObjectId must be a string or ObjectId instance')

def serialize_objectid(obj_id: ObjectId) -> str:
    return str(obj_id)
PyObjectId = Annotated[
    ObjectId,
    BeforeValidator(validate_objectid),
    PlainSerializer(serialize_objectid, return_type=str, when_used='json'),
    Field(
        json_schema_extra={
            'type': 'string',
            'format': 'objectid',
            'example': '60c72b2f5f1b2c001f0b0a0a'
        }
    )
]