from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    api_url: str = "http://127.0.0.1:1234/v1/chat/completions"
    model_name: str = "qwen/qwen3-1.7b"
    max_tokens: int = 1000
    temperature: float = 0.7

    class Config:
        env_file = ".env"


settings = Settings()
