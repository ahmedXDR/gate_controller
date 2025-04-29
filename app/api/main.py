from fastapi import APIRouter

from app.api.routes import gate, auth

api_router = APIRouter()
api_router.include_router(gate.router)
api_router.include_router(auth.router)
