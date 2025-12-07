"""API v1 routes"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def api_root():
    """API v1 root endpoint"""
    return {"message": "AgentForge API v1", "status": "active"}
