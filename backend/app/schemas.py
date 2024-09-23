# backend/app/schemas.py

from pydantic import BaseModel, validator
from datetime import datetime
from typing import List, Optional

# User Schemas
class UserBase(BaseModel):
    name: str
    username: str

class UserCreate(UserBase):
    password: str
    re_password: str

    @validator('re_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    username: str

    class Config:
        from_attributes = True

# Message Schemas
class MessageBase(BaseModel):
    content: str

class MessageCreate(MessageBase):
    receiver_id: int

class MessageResponse(BaseModel):
    id: int
    content: str
    timestamp: datetime
    sender_id: int
    receiver_id: int

    class Config:
        from_attributes = True
        

class MessageCreate(BaseModel):
    content: str
    receiver_id: int
