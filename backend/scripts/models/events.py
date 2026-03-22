from sqlalchemy import TIMESTAMP, func, ForeignKey, Column, Enum
from sqlalchemy.orm import Mapped, mapped_column

from scripts.models.enums import EventStatus

from . import Base


class Events(Base):
    __tablename__ = 'events'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    members_count: Mapped[int] = mapped_column()
    image_path: Mapped[str] = mapped_column(server_default="")

    status = Column(Enum(EventStatus, name="event_enum", create_type=True), server_default=EventStatus.OPEN)

    created_by: Mapped[int] = mapped_column(ForeignKey('users.id'))
    created_at = Column(TIMESTAMP, server_default=func.now())
    start_at = Column(TIMESTAMP)
    end_at = Column(TIMESTAMP)
