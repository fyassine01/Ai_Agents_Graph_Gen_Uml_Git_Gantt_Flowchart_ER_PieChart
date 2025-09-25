# app/services/groq_service.py
import os
import json
from groq import Groq
from ..utils.prompts import SYSTEM_PROMPTS

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def prepare_history_for_api(conversation_history: list) -> list:
    """
    Nettoie l'historique pour l'API Groq.
    - Ne garde que les clés 'role' et 'content'.
    - Intègre 'mermaid_code' dans le contenu pour donner du contexte à l'IA.
    """
    clean_history = []
    for msg in conversation_history:
        clean_msg = {"role": msg.get("role"), "content": msg.get("content", "")}
        
        if msg.get("role") == "assistant" and "mermaid_code" in msg and msg["mermaid_code"]:
            clean_msg["content"] += f"\n\nVoici le code Mermaid généré précédemment :\n```mermaid\n{msg['mermaid_code']}\n```"
        
        clean_history.append(clean_msg)
    return clean_history


def generate_diagram(diagram_type: str, conversation_history: list, user_message: str):
    system_prompt = SYSTEM_PROMPTS.get(diagram_type, SYSTEM_PROMPTS["Flowchart"])
    
    clean_history = prepare_history_for_api(conversation_history)
    
    messages_to_send = [
        {"role": "system", "content": f"{system_prompt}\nType de diagramme actuel: {diagram_type}"}
    ]
    messages_to_send.extend(clean_history)
    messages_to_send.append({"role": "user", "content": user_message})

    try:
        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",  # Utilisons un modèle plus récent et performant pour le JSON
            messages=messages_to_send,
            temperature=0.2,
            max_tokens=2048,
            top_p=1,
            stream=False,
            response_format={"type": "json_object"}, # On force la réponse en JSON
        )
        response_content = completion.choices[0].message.content
        
        # Parser la réponse JSON
        data = json.loads(response_content)
        title = data.get("title", f"Conversation sur {diagram_type}")
        mermaid_code = data.get("mermaid_code", "# Erreur: code non généré")

        return {
            "title": title,
            "mermaid_code": mermaid_code
        }
    except json.JSONDecodeError as e:
        print(f"Erreur de décodage JSON: {e}\nRéponse reçue: {response_content}")
        return None
    except Exception as e:
        print(f"Erreur API Groq: {e}")
        return None