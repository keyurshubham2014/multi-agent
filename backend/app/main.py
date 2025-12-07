"""
AgentForge Backend - FastAPI Application
Main entry point for the ADK integration service
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import router as api_router
from app.core.config import settings

app = FastAPI(
    title="AgentForge API",
    description="Backend API for AgentForge multi-agent AI system builder",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "0.1.0"}


# Include API routes
app.include_router(api_router, prefix="/api/v1")
