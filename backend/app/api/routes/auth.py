from fastapi import APIRouter
from fastapi.security import HTTPBasic
from pydantic import BaseModel

from app.api.deps import CurrentUser

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

security = HTTPBasic()


class LoginResponse(BaseModel):
    message: str


@router.post("/login", response_model=LoginResponse)
async def login(user: CurrentUser):
    return {"message": "Login successful"}
