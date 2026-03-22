from sqlalchemy import TIMESTAMP, Column, func, ForeignKey, Enum
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from . import Base
from scripts.models.enums import NewsStatus


class News(Base):
    __tablename__ = 'news'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column()
    text: Mapped[str] = mapped_column()

    status = Column(Enum(NewsStatus, name='news_enum', create_type=True), server_default=NewsStatus.DRAFT)
    created_at = Column(TIMESTAMP, server_default=func.now())
    created_by: Mapped[int] = mapped_column(ForeignKey('users.id'))
