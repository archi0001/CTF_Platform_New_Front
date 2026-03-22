from sqlalchemy import ForeignKey, Column, Enum
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from . import Base
from scripts.models.enums import AdminRoles


class Admin(Base):
    __tablename__ = 'admins'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))

    role = Column(Enum(AdminRoles, name='role_enum', create_type=True), server_default=AdminRoles.JUNIOR)
    promoted_by: Mapped[int] = mapped_column(ForeignKey("users.id"))
