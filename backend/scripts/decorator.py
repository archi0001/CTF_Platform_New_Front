from sqlalchemy.exc import IntegrityError, DataError, OperationalError
from functools import wraps


def db_error_handler(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except (IntegrityError, DataError, OperationalError) as e:
            print(f"DB Error: {e}")
            return False
        except Exception as e:
            print(f"Unknown error: {e}")
            return False

    return wrapper
