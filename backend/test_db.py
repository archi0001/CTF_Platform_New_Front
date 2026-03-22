from scripts.models import *
from scripts.models import Users, Events, Team
from scripts.db import create_session
from scripts.db import engine
from scripts.db import *

import bcrypt


Base.metadata.create_all(bind=engine)

users = [
    {"firstname": "admin",
     "secondname": "admin",
     "lastname": "admin",
     "nickname": "admin",
     "team": "admin",
     "email": "admin@gmail.com",
     "organization": "admin",
     "password_hash": "admin",
     "bio": "admin",
     "contact": "@admin"},
    {
        "firstname": "Иван",
        "secondname": "Петрович",
        "lastname": "Кузнецов",
        "nickname": "ivan_kz",
        "team": "RedFox",
        "email": "ivan.kuznetsov@gmail.com",
        "organization": "ГУАП",
        "password_hash": "hash123ivan",
        "bio": "Студент, интересуюсь backend-разработкой",
        "contact": "@admsin"
    },
    {
        "firstname": "Мария",
        "secondname": "Андреевна",
        "lastname": "Соколова",
        "nickname": "mari_soft",
        "team": "BlueBirds",
        "email": "maria.sokolova@gmail.com",
        "organization": "СПбГУ",
        "password_hash": "hash456maria",
        "bio": "Люблю фронтенд и дизайн",
        "contact": "@admasdin"
    },
    {
        "firstname": "Дмитрий",
        "secondname": "Олегович",
        "lastname": "Ильин",
        "nickname": "ilyin_dev",
        "team": "RedFox",
        "email": "dmitry.ilin@gmail.com",
        "organization": "ГУАП",
        "password_hash": "hash789dmitry",
        "bio": "Python-разработчик CTF",
        "contact": "@adminfd"
    },
    {
        "firstname": "Алексей",
        "secondname": "Игоревич",
        "lastname": "Смирнов",
        "nickname": "smir_nov",
        "team": "NoTeam",
        "email": "alexey.smirnov@gmail.com",
        "organization": "МГТУ",
        "password_hash": "hash321alex",
        "bio": "Геймдев и немного мобильная разработка",
        "contact": "@admina"
    },
    {
        "firstname": "Екатерина",
        "secondname": "Владимировна",
        "lastname": "Морозова",
        "nickname": "kat_mrz",
        "team": "BlueBirds",
        "email": "ekaterina.morozova@gmail.com",
        "organization": "ИТМО",
        "password_hash": "hash999katya",
        "bio": "Математик, люблю ML и аналитические задачи",
        "contact": "@adminf"
    }
]

news = [
    {
        "title": "Запуск нового сезона CTF",
        "text": "Мы открываем новый сезон соревнований! Участников ждут обновленные задания и новые форматы.",
        "created_by": 1
    },
    {
        "title": "Обновление платформы",
        "text": "Мы переработали серверную часть и ускорили работу API. Также исправлены ошибки в системе команд.",
        "created_by": 1
    },
    {
        "title": "Набор волонтёров",
        "text": "Команде проекта требуются волонтёры для помощи в организации офлайн-этапа. Все желающие могут подать заявку.",
        "created_by": 1
    },
    {
        "title": "Добавлены новые курсы по кибербезопасности",
        "text": "Теперь на платформе доступны обучающие курсы по OSINT, веб-безопасности и реверс-инжинирингу.",
        "created_by": 1
    },
    {
        "title": "Предстоящий турнир",
        "text": "Через две недели пройдет турнир между командами университета. Подробности и регистрация — на сайте.",
        "created_by": 1
    }
]

event = [
    {
        "name": "Cyber Arena 2025",
        "description": "Крупный университетский турнир по кибербезопасности с участием нескольких вузов.",
        "members_count": "150",
        "start_at": "2025-12-02 10:00:00",
        "end_at": "2025-12-08 20:00:00",
        "created_by": 1
    },
    {
        "name": "Web Security Challenge",
        "description": "Соревнование, посвящённое уязвимостям веб-приложений и практическим заданиям.",
        "members_count": "80",
        "start_at": "2025-04-05 09:00:00",
        "end_at": "2025-08-05 18:00:00",
        "created_by": 1
    },
    {
        "name": "CTF Beginners Cup",
        "description": "Ивент для новичков, который поможет освоить основы CTF и попробовать себя в разных категориях.",
        "members_count": "120",
        "start_at": "2025-02-21 12:00:00",
        "end_at": "2025-08-21 17:00:00",
        "created_by": 1
    },
    {
        "name": "Reverse Engineering Day",
        "description": "Однодневное интенсивное соревнование по реверс-инжинирингу и бинарному анализу.",
        "members_count": "60",
        "start_at": "2025-12-10 11:00:00",
        "end_at": "2026-05-10 19:00:00",
        "created_by": 1
    },
    {
        "name": "Night Hack Quest",
        "description": "Ночной марафон с заданиями разных категорий, ориентированный на опытных участников.",
        "members_count": "90",
        "start_at": "2026-12-03 23:00:00",
        "end_at": "2026-12-04 06:00:00",
        "created_by": 1
    }
]

user_data_list = []

for user in users:
    password = user['password_hash']
    user['password_hash'] = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    add_user(user)
for el in event:
    add_event(el)
for el in news:
    add_news(0, el)
