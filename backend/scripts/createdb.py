from scripts.db import *
from sqlalchemy import text


def ensure_enum(name: str, enum_class: type):
    with engine.begin() as conn:
        exists = conn.execute(
            text("SELECT 1 FROM pg_type WHERE typname = :name"), {"name": name}
        ).scalar()

        if not exists:
            # создаем новый ENUM с нужными значениями
            values = ",".join(f"'{e.value}'" for e in enum_class)
            conn.execute(text(f"CREATE TYPE {name} AS ENUM ({values});"))
        else:
            # проверяем текущие значения ENUM и добавляем недостающие
            existing_values = conn.execute(
                text(f"SELECT unnest(enum_range(NULL::{name}));")
            ).scalars().all()

            for e in enum_class:
                if e.value not in existing_values:
                    conn.execute(text(f"ALTER TYPE {name} ADD VALUE '{e.value}';"))


def init_db_enums():
    ensure_enum("event_enum", EventStatus)
    ensure_enum("user_status_enum", UserStatus)
    ensure_enum("role_enum", AdminRoles)
    ensure_enum("news_enum", NewsStatus)

    Base.metadata.create_all(bind=engine)
