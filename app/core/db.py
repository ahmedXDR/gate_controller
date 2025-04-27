from app.core.config import settings


def get_db() -> dict[str, str]:
    return {
        "username": settings.FIRST_SUPERUSER,
        "password": settings.FIRST_SUPERUSER_PASSWORD,
    }
