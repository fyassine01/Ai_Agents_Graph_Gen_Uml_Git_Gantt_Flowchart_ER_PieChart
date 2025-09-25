# app/schemas/conversation.py
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Message(BaseModel):
    role: str
    content: str
    mermaid_code: Optional[str] = None

class ConversationBase(BaseModel):
    title: str

class ConversationCreate(ConversationBase):
    pass

class Conversation(ConversationBase):
    id: int
    owner_id: int
    messages: List[Message]

    class Config:
        orm_mode = True

class DiagramRequest(BaseModel):
    conversation_id: Optional[int]
    user_message: str
    diagram_type: str