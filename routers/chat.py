from typing import Union

from fastapi import APIRouter

from models.schemas import ChatRequest, ChatResponse, ErrorResponse
from services.ai_service import ai_service

router = APIRouter()


@router.post("/chat", response_model=Union[ChatResponse, ErrorResponse])
def chat(chat_request: ChatRequest):
    return ai_service.get_chat_response(chat_request.message, chat_request.conversation_history)
