"""
Application configuration using Pydantic Settings
"""

from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )

    # Application
    APP_NAME: str = "AgentForge"
    DEBUG: bool = False

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_KEY: str = ""

    # Google ADK
    GOOGLE_ADK_PROJECT_ID: str = ""
    GOOGLE_API_KEY: str = ""

    # External APIs
    GOOGLE_MAPS_API_KEY: str = ""
    WEB_SEARCH_API_KEY: str = ""


settings = Settings()
