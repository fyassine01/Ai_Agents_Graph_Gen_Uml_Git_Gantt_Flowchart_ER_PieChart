# app/routers/conversations.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import database, schemas, models
from ..services import auth as auth_service

router = APIRouter(prefix="/conversations", tags=["Conversations"])

@router.get("/", response_model=List[schemas.Conversation])
def get_user_conversations(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    #return db.query(models.Conversation).filter(models.Conversation.owner_id == current_user.id).all()
    return db.query(models.Conversation)\
             .filter(models.Conversation.owner_id == current_user.id)\
             .order_by(models.Conversation.updated_at.desc())\
             .all()
@router.get("/{conversation_id}", response_model=schemas.Conversation)
def get_conversation_details(
    conversation_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    conversation = db.query(models.Conversation).filter(
        models.Conversation.id == conversation_id,
        models.Conversation.owner_id == current_user.id
    ).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation


@router.delete("/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    conversation = db.query(models.Conversation).filter(
        models.Conversation.id == conversation_id,
        models.Conversation.owner_id == current_user.id
    ).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    db.delete(conversation)
    db.commit()
    return