from typing import List, Optional

import requests

from config import settings
from models.schemas import Message


class AIService:
    def __init__(self):
        self.headers = {"Content-Type": "application/json"}

    def get_chat_response(self, message: str, conversation_history: Optional[List[Message]] = None) -> dict:
        messages = []

        if conversation_history:
            for msg in conversation_history:
                messages.append({"role": msg.role, "content": msg.content})

        messages.append({"role": "user", "content": message})

        data = {
            "messages": messages,
            "model": settings.model_name,
            "max_tokens": settings.max_tokens,
            "temperature": settings.temperature,
        }

        response = requests.post(settings.api_url, headers=self.headers, json=data)

        if response.status_code == 200:
            result = response.json()
            return {"reply": result["choices"][0]["message"]["content"]}
        else:
            return {"error": response.status_code, "details": response.text}


ai_service = AIService()
