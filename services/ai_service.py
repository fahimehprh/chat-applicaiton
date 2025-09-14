import requests

from config import settings


class AIService:
    def __init__(self):
        self.headers = {"Content-Type": "application/json"}

    def get_chat_response(self, message: str) -> dict:
        data = {
            "messages": [{"role": "user", "content": message}],
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
