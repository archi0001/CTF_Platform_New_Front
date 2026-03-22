from sqlalchemy import TIMESTAMP, func, ForeignKey, Column, Integer, String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from . import Base


class Team(Base):
    __tablename__ = 'team'
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    teamname: Mapped[str] = mapped_column(unique=True)
    count: Mapped[int] = mapped_column(default=1)
    teamlead: Mapped[int] = mapped_column(ForeignKey("users.id"))
    created_at = Column(TIMESTAMP, server_default=func.now())

