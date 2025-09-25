# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from .models import user, conversation
from .routers import auth, diagrams, conversations

# Crée les tables dans la BDD (pour le dev, en prod on utiliserait Alembic)
user.Base.metadata.create_all(bind=engine)
conversation.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mermaid Diagram Generator API")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # L'URL de votre frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routeurs
app.include_router(auth.router)
app.include_router(diagrams.router)
app.include_router(conversations.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Mermaid Diagram Generator API"}