# app/routers/diagrams.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, schemas, models
from ..services import auth as auth_service
from ..services import groq_service

router = APIRouter(prefix="/diagrams", tags=["Diagrams"])

@router.post("/generate")
def generate_diagram_endpoint(
    request: schemas.DiagramRequest,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    conversation_history = []
    conversation = None
    
    # Appel au service Groq en premier pour avoir le titre si c'est une nouvelle conversation
    api_response = groq_service.generate_diagram(
        request.diagram_type, 
        [], # Historique vide pour le moment, sera chargé plus bas si nécessaire
        request.user_message
    )
    if not api_response or not api_response.get("mermaid_code"):
        raise HTTPException(status_code=500, detail="Failed to generate diagram from AI service")

    if request.conversation_id:
        conversation = db.query(models.Conversation).filter(
            models.Conversation.id == request.conversation_id,
            models.Conversation.owner_id == current_user.id
        ).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        # On aurait dû envoyer l'historique réel, donc on doit refaire l'appel.
        # Note: Pour optimiser, on pourrait d'abord vérifier si la conv existe.
        # Mais pour garder la logique simple, on refait l'appel avec l'historique.
        api_response = groq_service.generate_diagram(
            request.diagram_type,
            conversation.messages, # On envoie maintenant l'historique complet
            request.user_message
        )
        if not api_response or not api_response.get("mermaid_code"):
            raise HTTPException(status_code=500, detail="Failed to update diagram from AI service")

    else:
        # Créer une nouvelle conversation EN UTILISANT LE TITRE DE L'IA
        conversation = models.Conversation(
            title=api_response.get("title", f"Conversation sur {request.diagram_type}"), # Utilise le titre de l'IA
            owner_id=current_user.id,
            messages=[]
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # Mise à jour de l'historique dans tous les cas
    new_messages = list(conversation.messages)
    new_messages.append({"role": "user", "content": request.user_message})
    
    assistant_message = {
        "role": "assistant",
        "content": "Diagramme généré/mis à jour.",
        "mermaid_code": api_response["mermaid_code"]
    }
    new_messages.append(assistant_message)
    
    conversation.messages = new_messages
    db.commit()

    return {
        "conversation_id": conversation.id,
        "new_title": conversation.title, # On peut renvoyer le nouveau titre au frontend
        "assistant_message": assistant_message,
        "full_history": new_messages
    }