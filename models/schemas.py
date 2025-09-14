from pydantic import BaseModel


class UserMessage(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


class ErrorResponse(BaseModel):
    error: int
    details: str
