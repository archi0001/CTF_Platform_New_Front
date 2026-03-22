from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from scripts.models import *
from scripts.decorator import db_error_handler
from scripts.models.enums import EventStatus, UserStatus, AdminRoles, NewsStatus
from data.config import db_url

from datetime import datetime

engine = create_engine(db_url.replace('\xa0', '').strip(), echo=True)
FORMATS = [
    "%Y-%m-%d %H:%M:%S",
    "%Y-%m-%d",
    "%d.%m.%Y %H:%M",
]

available_event_parms = ['description', 'status', 'members_count', 'image_path', 'end_at', 'start_at', 'name', 'status']
available_user_parms = ['firstname', 'secondname', 'lastname', 'nickname', 'team', 'email', 'organization',
                        'avatar_path']


def create_session():
    session = sessionmaker(bind=engine)
    return session()


def parse_datetime(value: str):
    for fmt in FORMATS:
        try:
            return datetime.strptime(value, fmt)
        except ValueError:
            pass
    raise ValueError(f"Неверный формат даты: {value}")


# =====Стандартные свободные функции для бд =====
@db_error_handler
def add_record(table, fields, data, session=create_session()):
    pass


@db_error_handler
def get_record(table, fields="*", session=create_session()):
    pass


# ===== Специализированные функции =====


# ===== Добавление пользователя =====
@db_error_handler
def add_user(data: dict, session=create_session()):
    try:
        if session.query(Users).filter(Users.email == data['email']).first():
            return False
        if session.query(Users).filter(Users.nickname == data['nickname']).first():
            return False
        if session.query(Users).filter(Users.contact == data['contact']).first():
            return False

        user = Users()
        user.firstname = data['firstname']
        user.secondname = data['secondname']
        user.lastname = data['lastname']
        user.nickname = data['nickname']
        user.email = data['email']
        user.organization = data['organization']
        user.password_hash = data['password_hash']
        user.bio = data.get("bio", "")
        user.contact = data['contact']

        session.add(user)
        session.commit()
        session.refresh(user)
        return True
    except Exception:
        session.rollback()
        return False
    finally:
        session.close()



# ===== Бан пользователя =====
@db_error_handler
def ban_user(user_id: int, session=create_session()):
    user = session.get(Users, user_id)
    if user.status != UserStatus.BANNED:
        user.status = UserStatus.BANNED
    else:
        user.status = UserStatus.PENDING
    session.commit()
    session.refresh(user)
    session.close()
    return True


# ===== Изменение пользователя =====
@db_error_handler
def edit_user(user_id: int, data: dict, session=create_session()):
    user = session.get(Users, user_id)
    for name, value in data.items():
        setattr(user, name, value)
    session.commit()
    session.refresh(user)
    session.close()
    return True


# ===== Редактирование статусам пользователя =====
@db_error_handler
def edit_status_user(user_id: int, banned=False, pending=False, active=False, session=create_session()):
    user = session.get(Users, user_id)
    if sum(bool(x) for x in [banned, pending, active]) != 1:
        raise ValueError("Передай ровно один параметр статуса (banned/pending/active).")

    if banned:
        user.status = UserStatus.BANNED
    elif pending:
        user.status = UserStatus.PENDING
    elif active:
        user.status = UserStatus.ACTIVE

    session.commit()
    session.refresh(user)
    session.close()
    return True


# ===== Изменение user_secret =====
@db_error_handler
def new_secret(user_id: int, secret, session=create_session()):
    user = session.get(Users, user_id)
    user.user_secret = secret
    session.commit()
    session.close()
    return True


# ===== Почта для восстановления пароля =====
@db_error_handler
def reset_password(user_id: int, session=create_session()):
    user = session.get(Users, user_id)
    session.close()
    return {"id": user_id,
            "data": {
                "email": user.email
            }
            }


# ===== Изменение пароля пользователя =====
@db_error_handler
def new_password(user_id: int, new_pswd_hash, session=create_session()):
    user = session.get(Users, user_id)
    user.password_hash = new_pswd_hash
    session.commit()
    session.close()
    return True


# ===== Изменение аватара пользователя =====
@db_error_handler
def new_avatar(user_id: int, avatar_path, session=create_session()):
    user = session.get(Users, user_id)
    user.avatar_path = avatar_path
    session.commit()
    session.close()
    return True


# ===== Информация о пользователе =====
@db_error_handler
def user_info(user_id: int, admin=False, session=create_session()):
    user = session.get(Users, user_id)
    if not user:
        session.close()
        return None

    role = "member"
    if user.team != 0:
        team = session.get(Team, user.team)
        if team and team.teamlead == user_id:
            role = "lead"

    res = {
        "id": user_id,
        "data": {
            "firstname": user.firstname,
            "secondname": user.secondname,
            "lastname": user.lastname,
            "nickname": user.nickname,
            "team": user.team,
            "team_role": role,
            "email": user.email,
            "organization": user.organization,
            "avatar_path": user.avatar_path,
            "bio": user.bio,
            "ctf_compete": user.ctf_compete,
            "task_complete": user.task_complete,
            "contact": user.contact
        }
    }
    session.close()
    return res


# ===== Удалить пользователя =====
@db_error_handler
def delete_user(user_id: int, session=create_session()):
    user = session.query(Users).filter_by(id=user_id).first()

    if not user:
        return False

    session.delete(user)
    session.commit()
    session.close()
    return True


# ===== Добавление ивента =====
@db_error_handler
def add_event(data: dict, session=create_session()):
    event = Events()
    for name, value in data.items():
        if name in ("start_at", "end_at") and isinstance(value, str):
            value = datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
        setattr(event, name, value)

    session.add(event)
    session.commit()
    session.close()
    return True


# ===== Измение информации об ивенте =====
@db_error_handler
def edit_event(event_id: int, data: dict, session=create_session()):
    event = session.get(Events, event_id)

    for name, value in data.items():
        if name in available_event_parms:
            if name in ("start_at", "end_at") and isinstance(value, str):
                value = parse_datetime(value)
            setattr(event, name, value)
    session.commit()
    session.close()
    return True


# ===== Измение статуса ивента =====
@db_error_handler
def change_event_status(event_id: int, open=False, closed=False, private=False, session=create_session()):
    if sum(bool(x) for x in [open, closed, private]) != 1:
        raise ValueError("Передай ровно один параметр статуса (open/closed/private).")

    event = session.get(Events, event_id)

    if open:
        event.status = EventStatus.OPEN
    elif closed:
        event.status = EventStatus.CLOSED
    elif private:
        event.status = EventStatus.PRIVATE

    session.commit()
    session.refresh(event)
    session.close()
    return True


# ===== Все ивенты =====
@db_error_handler
def all_events(session=create_session()):
    events = session.query(Events).all()
    res = []

    for el in events:
        res.append({
            "id": el.id,
            "data": {
                "name": el.name,
                "description": el.description,
                "member_count": el.members_count,
                "image_path": el.image_path,
                "start_at": el.start_at,
                "end_at": el.end_at,
                'status': el.status
            }
        })

    return res


# ===== Информация об ивенете =====
@db_error_handler
def event_info(event_id: int, session=create_session()):
    event = session.get(Events, event_id)
    session.close()
    if event:
        return {
            "id": event.id,
            "data": {
                "name": event.name,
                "description": event.description,
                "members_count": event.members_count,
                "image_path": event.image_path,
                "start_at": event.start_at,
                "end_at": event.end_at
            }
        }
    else:
        return None


# ===== Удалить ивент =====
@db_error_handler
def delete_event(event_id: int, session=create_session()):
    event = session.query(Events).filter_by(id=event_id).first()

    if not event:
        return False

    session.delete(event)
    session.commit()
    session.close()
    return True


# ===== Получение всех ивентов, где участвует пользователь =====
@db_error_handler
def user_events(user_id: int, session=create_session()):
    events = session.query(UserEvent).filter(UserEvent.user_id == user_id)
    session.close()
    return {'user_id': user_id, "events": [event.event_id for event in events]}


# ===== Добавляет пользователю ивент, где он принимает участие =====
@db_error_handler
def add_userEvent(user_id: int, event_id: int, session=create_session()):
    userevent = UserEvent()
    userevent.user_id = user_id
    userevent.event_id = event_id
    session.add(userevent)
    session.commit()
    session.close()
    return True


# ===== Создания команды =====
@db_error_handler
def create_team(user_id: int, teamname: str, session=create_session()):
    team = Team()
    team.teamname = teamname
    if session.get(Users, user_id):
        team.teamlead = user_id
    else:
        team.teamlead = 0

    session.add(team)
    session.commit()
    session.close()
    return True


# ===== Получение всех команд =====
@db_error_handler
def all_team(session=create_session()):
    teams = session.query(Team).all()
    session.close()
    res = []
    for team in teams:
        res.append({
            "id": team.id,
            "data": {
                "teamname": team.teamname,
                "count": team.count,
                "teamlead": team.teamlead
            }
        })

    return res


# ===== Получение информации о команде =====
@db_error_handler
def team_info(team_id: int, session=create_session()):
    team = session.get(Team, team_id)
    members = [el.id for el in session.query(Users).filter(Users.team == team.id)]
    session.close()
    return {"id": team.id,
            "data": {
                "teamname": team.teamname,
                "count": team.count,
                "teamlead": team.teamlead,
                "members": members
            }
            }


# ===== Получение участников команды =====
@db_error_handler
def team_members(team_id: int, session=create_session()):
    users = session.query(Users).filter(Users.team == team_id)
    session.close()
    members = []
    for user in users:
        members.append({
            "user_id": user.id,
            "nickname": user.nickname,
            "role": user.role
        })

    return {
        "id": team_id,
        "members": members
    }


# ===== Удаления команды =====
@db_error_handler
def delete_team(team_id: int, session=create_session()):
    team = session.query(Team).filter_by(id=team_id).first()

    if not team:
        return False

    session.delete(team)
    session.commit()
    session.close()
    return True


# ===== Добавляет новость =====
@db_error_handler
def add_news(user_id: int, data: dict, session=create_session()):
    news = News()
    for name, value in data.items():
        setattr(news, name, value)
    session.add(news)
    session.commit()
    session.close()
    return True


# ===== Изменяет новость =====
@db_error_handler
def edit_news(news_id: int, data: dict, session=create_session()):
    news = session.get(News, news_id)
    for name, value in data.items():
        setattr(news, name, value)
    session.commit()
    session.close()
    return True


# ===== Изменяет статус новости =====
@db_error_handler
def change_news_status(news_id: int, draft=False, published=False, scheduled=False, session=create_session()):
    if sum(bool(x) for x in [draft, published, scheduled]) != 1:
        raise ValueError("Передай ровно один параметр статуса (draft/published/scheduled).")

    news = session.get(News, news_id)
    if draft:
        news.status = NewsStatus.DRAFT
    elif published:
        news.status = NewsStatus.PUBLISHED
    elif scheduled:
        news.status = NewsStatus.SCHEDULED

    session.commit()
    session.refresh(news)
    session.close()
    return True


# ===== Получение информации об новости =====
@db_error_handler
def news_info(news_id: int, session=create_session()):
    news = session.get(News, news_id)
    session.close()

    return {
        "id": news.id,
        "data": {
            "title": news.title,
            "text": news.text,
            "created_at": news.created_at,
            "status": news.status,
            "created_by": news.created_by
        }
    }


# ===== Получение всех новостей =====
@db_error_handler
def all_newses(session=create_session()):
    newses = session.query(News).all()
    res = []
    for news in newses:
        res.append({
            "id": news.id,
            "data": {
                "title": news.title,
                "text": news.text,
                "created_at": news.created_at,
                "status": news.status,
                "created_by": news.created_by
            }
        })
    return res


# ===== Удаления новости =====
@db_error_handler
def delete_news(news_id: int, session=create_session()):
    news = session.query(News).filter_by(id=news_id).first()

    if not news:
        return False

    session.delete(news)
    session.commit()
    session.close()
    return True


# ===== Добавляет нового админа =====
@db_error_handler
def add_admin(admin_id: int, user_id: int, session=create_session()):
    admin = Admin()
    admin.user_id = user_id
    admin.promoted_by = admin_id
    session.add(admin)
    session.commit()
    session.close()
    return True


# ===== Изменяет роль админа =====
@db_error_handler
def change_role_admin(user_id: int, elder=False, editor=False, junior=False, session=create_session()):
    if sum(bool(x) for x in [elder, editor, junior]) != 1:
        raise ValueError("Передай ровно один параметр статуса (elder/editor/junior).")
    admin = session.query(Admin).filter_by(user_id=user_id).first()
    if elder:
        admin.role = AdminRoles.ELDER
    elif editor:
        admin.role = AdminRoles.EDITOR
    elif junior:
        admin.role = AdminRoles.JUNIOR

    session.commit()
    session.refresh(admin)
    session.close()
    return True


# ===== Удаляет админа =====
@db_error_handler
def delete_admin(user_id: int, session=create_session()):
    admin = session.query(Admin).filter_by(user_id=user_id).first()

    if not admin:
        return False

    session.delete(admin)
    session.commit()
    session.close()
    return True
