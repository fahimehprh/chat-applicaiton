from fastapi import FastAPI

from middleware.cors import setup_cors
from routers.chat import router as chat_router

app = FastAPI()

setup_cors(app)

app.include_router(chat_router)
