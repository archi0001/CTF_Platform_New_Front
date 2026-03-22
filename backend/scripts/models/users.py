from sqlalchemy import TIMESTAMP, func, Column, Enum
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from scripts.models.enums import UserStatus
from . import Base


class Users(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)

    firstname: Mapped[str] = mapped_column()
    secondname: Mapped[str] = mapped_column()
    lastname: Mapped[str] = mapped_column()

    nickname: Mapped[str] = mapped_column(unique=True)
    team: Mapped[int] = mapped_column(default=0)
    email: Mapped[str] = mapped_column(unique=True)
    contact: Mapped[str] = mapped_column(unique=True)
    organization: Mapped[str] = mapped_column()

    avatar_path: Mapped[str] = mapped_column(server_default="")
    bio: Mapped[str] = mapped_column(server_default="")

    ctf_compete: Mapped[int] = mapped_column(default=0)
    task_complete: Mapped[int] = mapped_column(default=0)

    created_at = Column(TIMESTAMP, server_default=func.now())

    password_hash: Mapped[str] = mapped_column()
    user_secret: Mapped[str] = mapped_column(default="")

    status = Column(Enum(UserStatus, name="user_status_enum", create_type=True), server_default=UserStatus.ACTIVE)
    is_admin: Mapped[bool] = mapped_column(default=False)
