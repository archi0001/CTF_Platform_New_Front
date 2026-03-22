import enum
from symtable import Class


class EventStatus(str, enum.Enum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"
    PRIVATE = "PRIVATE"


class UserStatus(str, enum.Enum):
    ACTIVE = 'ACTIVE'
    PENDING = 'PENDING'
    BANNED = 'BANNED'


class AdminRoles(str, enum.Enum):
    ELDER = 'ELDER'
    EDITOR = 'EDITOR'
    JUNIOR = 'JUNIOR'


class NewsStatus(str, enum.Enum):
    DRAFT = 'DRAFT'
    PUBLISHED = 'PUBLISHED'
    SCHEDULED = 'SCHEDULED'


