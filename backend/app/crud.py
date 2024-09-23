# backend/app/crud.py

from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# User Operations
def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        username=user.username,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def search_users(db: Session, query: str):
    return db.query(models.User).filter(models.User.username.contains(query) | models.User.name.contains(query)).all()

# Message Operations
def create_message(db: Session, message: schemas.MessageCreate, sender_id: int):
    db_message = models.Message(
        content=message.content,
        sender_id=sender_id,
        receiver_id=message.receiver_id
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_chat_history(db: Session, user_id: int):
    chats = db.query(models.Message).filter(
        (models.Message.sender_id == user_id) | (models.Message.receiver_id == user_id)
    ).order_by(models.Message.timestamp).all()
    return chats

def get_messages_between_users(db: Session, user_id: int, other_user_id: int):
    print(f"get_messages_between_users called with user_id={user_id}, other_user_id={other_user_id}")
    messages = db.query(models.Message).filter(
        ((models.Message.sender_id == user_id) & (models.Message.receiver_id == other_user_id)) |
        ((models.Message.sender_id == other_user_id) & (models.Message.receiver_id == user_id))
    ).order_by(models.Message.timestamp).all()
    return messages



def get_chat_partners(db: Session, user_id: int):
    sent = db.query(models.Message.receiver_id).filter(models.Message.sender_id == user_id)
    received = db.query(models.Message.sender_id).filter(models.Message.receiver_id == user_id)
    user_ids = sent.union(received).subquery()

    partners = db.query(models.User).filter(models.User.id.in_(user_ids)).all()
    return partners
