# app/models/conversation.py
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Le champ created_at reste pour savoir quand la conversation a été créée
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # NOUVEAU CHAMP: Se met à jour à chaque modification
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    messages = Column(JSON, default=[]) # Stocke l'historique [{role, content, mermaid_code?}]

    owner = relationship("User", back_populates="conversations")