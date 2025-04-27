from collections.abc import AsyncGenerator
from fastapi import APIRouter
from fastapi.concurrency import asynccontextmanager
from serial import Serial

from app.api.routes.deps import CurrentUser
from app.schemas import Command
from app.utils.arduino import init_arduino, send_command

arduino: Serial | None = None


@asynccontextmanager
async def lifespan(router: APIRouter) -> AsyncGenerator[None, None]:
    global arduino
    arduino = init_arduino()
    yield
    arduino.close()


router = APIRouter(
    prefix="/gate",
    tags=["gate"],
    lifespan=lifespan,
)


@router.get("/open", tags=["gate"])
async def open_gate(user: CurrentUser):
    send_command(
        arduino,
        Command.OPEN_GATE,
    )
    return {"message": "Gate opened"}
