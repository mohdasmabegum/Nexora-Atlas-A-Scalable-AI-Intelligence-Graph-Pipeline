import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Nexora Atlas / IntelliMesh"
    API_V1_STR: str = "/api/v1"
    
    # Storage settings
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "nexora")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "nexora_secret")
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "nexora_db")
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    )
    
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # LLM Settings (Primary & Fallbacks)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "demo_gemini_key")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "demo_groq_key")
    DEEPSEEK_API_KEY: str = os.getenv("DEEPSEEK_API_KEY", "demo_deepseek_key")

    # Crawler Settings
    CONCURRENCY_LIMIT: int = 20
    FRESHNESS_HOURS: int = 24

    class Config:
        case_sensitive = True

settings = Settings()
