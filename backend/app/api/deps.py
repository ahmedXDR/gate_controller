from typing import Annotated

from fastapi import Depends

from app.core.auth import get_current_username

CurrentUser = Annotated[str, Depends(get_current_username)]
