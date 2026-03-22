# API Documentation

Документация описывает функции управления пользователями, командами, ивентами и новостями.  
Все функции используют SQLAlchemy и обёрнуты в декоратор `@db_error_handler`, который перехватывает ошибки БД.

# Содержание

- [Пользователи](#пользователи)
- [Ивенты](#ивенты)
- [Команды](#команды)
- [Новости](#новости)

# Пользователи

## add_user(data) → bool

Создаёт нового пользователя. Поддерживает автоматическое создание или добавление в команду.

### Параметры

| Имя  | Тип  | Описание                                                                                                                                         |
|------|------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| data | dict | Данные пользователя. Обязательные: firstname, secondname, lastname, nickname, email, organization, password_hash, avatar_path. Опционально: team |

Пример передаваемой data

```data = {"fisrtname": "Иван"}```

### Логика

- Создаёт пользователя.
- Если указано `team`:
    - если команда существует — пользователь добавляется, count++
    - иначе создаётся новая команда и пользователь становится её лидером.

### Возвращает

`True`

---

## ban_user(user_id) → bool

Бан или разбан пользователя.

### Логика

- Если статус не BANNED → меняет на BANNED.
- Если уже BANNED → меняет на PENDING.

---

## edit_user(user_id, data) → bool

Обновляет любые поля пользователя.

Пример передаваемой data

```data = {"fisrtname": "Иван"}```

Допустимые параметры
``['firstname', 'secondname', 'lastname', 'nickname', 'team', 'email', 'organization',
                        'avatar_path']``

---

## edit_status_user(user_id, banned=False, pending=False, active=False) → bool

Меняет статус пользователя.

### Ограничения

Передаётся **ровно один** параметр статуса.

### Ошибки

- `ValueError`, если передано не ровно одно состояние.

---

## new_secret(user_id, secret) → bool

Обновляет поле `user_secret`.

---

## reset_password(user_id) → dict

Возвращает email пользователя — используется для восстановления пароля.

---

## new_password(user_id, new_pswd_hash) → bool

Устанавливает новый хэш пароля.

---

## new_avatar(user_id, avatar_path) → bool

Меняет путь к аватару.

---

## user_info(user_id, admin=False) → dict | None

Возвращает данные о пользователе вида `{"id": 1, "data": {"firstname": "Иван", ...}}`

### Если `admin=True`, дополнительно включаются:

- status
- is_admin
- user_secret
- password_hash

---

## delete_user(user_id) → bool

Удаляет пользователя, если он существует.

---

# Ивенты

## add_event(data) → bool

Создаёт новый ивент.

Пример передаваемой data

```data = {"name": "CTF", ...}```

### Особенности

- `start_at` и `end_at` автоматически конвертируются из строк формата `"YYYY-MM-DD HH:MM:SS"`.

---

## edit_event(event_id, data) → bool

Обновляет выбранные поля ивента.

### Особенности

- Изменяются только поля, указанные в `available_event_parms`.
- start_at и end_at автоматически приводятся к datetime.

---

## change_event_status(event_id, open=False, closed=False, private=False) → bool

Меняет статус ивента.

### Возможные статусы

- OPEN
- CLOSED
- PRIVATE

### Ограничение

Передаётся **ровно один** флаг.

---

## all_events() → list

Возвращает список всех ивентов.

---

## event_info(event_id) → dict | None

Возвращает всю информацию об ивенте.

---

## delete_event(event_id) → bool

Удаляет ивент.

---

## user_events(user_id) → dict

Возвращает список ID ивентов, где участвует пользователь.

---

## add_userEvent(user_id, event_id) → bool

Добавляет пользователю участие в ивенте.

---

# Команды

## create_team(user_id, teamname) → bool

Создаёт команду.  
Если пользователь существует — он назначается лидером.

---

## all_team() → list

Возвращает список всех команд.

---

## team_info(team_id) → dict

Возвращает информацию о команде, включая:

- название
- участников
- количество
- лидера

---

## team_members(team_id) → dict

Возвращает участников команды с ролями.

---

## delete_team(team_id) → bool

Удаляет команду.

---

# Новости

## add_news(user_id, data) → bool

Создаёт новость.

---

## edit_news(news_id, data) → bool

Редактирует новость.

---

## change_news_status(news_id, draft=False, published=False, scheduled=False) → bool

Меняет статус новости.

### Возможные статусы:

- DRAFT
- PUBLISHED
- SCHEDULED

### Ограничение

Передаётся ровно один параметр.

---

## news_info(news_id) → dict

Возвращает информацию о новости:

- title
- text
- created_at
- status
- created_by  
