# backend/app/models.py

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)


    messages_sent = relationship('Message', foreign_keys='Message.sender_id', back_populates='sender')
    messages_received = relationship('Message', foreign_keys='Message.receiver_id', back_populates='receiver')

class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    sender_id = Column(Integer, ForeignKey('users.id'))
    receiver_id = Column(Integer, ForeignKey('users.id'))

    # Relationships
    sender = relationship('User', foreign_keys=[sender_id], back_populates='messages_sent')
    receiver = relationship('User', foreign_keys=[receiver_id], back_populates='messages_received')
