from typing import Union

from fastapi import APIRouter

from models.schemas import ChatResponse, ErrorResponse, UserMessage
from services.ai_service import ai_service

router = APIRouter()


@router.post("/chat", response_model=Union[ChatResponse, ErrorResponse])
def chat(user_msg: UserMessage):
    return ai_service.get_chat_response(user_msg.message)
