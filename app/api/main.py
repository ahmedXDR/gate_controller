from fastapi import APIRouter

from app.api.routes import gate

api_router = APIRouter()
api_router.include_router(gate.router)
