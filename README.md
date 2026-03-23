# CTFGuap — Платформа для CTF соревнований

Веб-платформа для организации и участия в CTF (Capture The Flag) соревнованиях.

## 📸 Скриншоты

<div align="center">
  <img src="Images/news.png" alt="Главная страница / Новости" width="45%">
  <img src="Images/challenges.png" alt="Соревнования" width="45%">
</div>
<div align="center">
  <img src="Images/team.png" alt="Команда" width="45%">
  <img src="Images/admin.png" alt="Панель администратора" width="45%">
</div>
<div align="center">
  <img src="Images/profile.png" alt="Профиль" width="60%">
</div>


## Изменения Archi
Изменен дизайн фронта, бэк абсолютно не трогался. Не знаю даже, живой он вообще, или нет. На страничках, где требуется какая-либо инфа извне, запросы в апи комментировал и заменял на статические тестовые массивы данных. (Страницы news, competitions (useCompetitions.ts), profile). Если Амировский бэк был дописан и работал, то нужно просто раскомментировать эти части, убрать статику, и все должно заработать. Страницы team не существовало, для нее обращение к бэку прописать отдельно.

На странице admin подвязать кнопки, пока пустые
Так же подвязать кнопки на странице соревнований, чтобы пересылали на нужные разделы CTFd









### Внизу не мое

## 📋 Содержание

- [Технологии](#технологии)
- [Требования](#требования)
- [Структура проекта](#структура-проекта)
- [Быстрый старт](#быстрый-старт)
- [Запуск через Docker](#запуск-через-docker)
- [Локальная разработка](#локальная-разработка)
- [Заполнение БД тестовыми данными](#заполнение-бд-тестовыми-данными)
- [API Документация](#api-документация)
- [Контакты](#контакты)

---

## 🛠 Технологии

### Backend
- **FastAPI** — веб-фреймворк
- **SQLAlchemy** — ORM для работы с БД
- **PostgreSQL** — база данных
- **bcrypt** — хеширование паролей
- **python-jose** — JWT токены
- **Jinja2** — шаблонизатор

### Frontend
- **React 19** — UI библиотека
- **TypeScript** — типизация
- **Vite** — сборщик
- **MobX** — управление состоянием
- **React Router** — роутинг
- **Axios** — HTTP клиент
- **Sass** — стилизация

---

## 📦 Требования

- **Docker** и **Docker Compose** — для контейнеризации
- **Node.js 20+** — для локальной разработки frontend
- **Python 3.10+** — для локальной разработки backend

---

## 📁 Структура проекта

```
CTFGuap-back-front/
├── backend/
│   ├── main.py              # Точка входа FastAPI
│   ├── requirements.txt     # Python зависимости
│   ├── Dockerfile           # Docker образ backend
│   ├── test_db.py           # Скрипт заполнения БД
│   ├── api.md               # API документация
│   ├── scripts/
│   │   ├── models.py        # SQLAlchemy модели
│   │   ├── db.py            # Функции работы с БД
│   │   └── auth.py          # Аутентификация и JWT
│   └── data/                # Данные для тестов
├── frontend/
│   ├── src/
│   │   ├── pages/           # Страницы приложения
│   │   ├── components/      # React компоненты
│   │   ├── services/        # API сервисы
│   │   ├── models/          # TypeScript типы
│   │   └── App.tsx          # Корневой компонент
│   ├── package.json         # Node.js зависимости
│   ├── Dockerfile           # Docker образ frontend
│   └── vite.config.ts       # Конфигурация Vite
├── docker-compose.yml       # Оркестрация контейнеров
└── README.md                # Этот файл
```

---

## 🚀 Быстрый старт

### 1. Установите Docker

Скачайте и установите [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2. Клонируйте репозиторий

```bash
git clone <repository-url>
cd CTFGuap-back-front
```

### 3. Запустите проект

```bash
docker compose up --build
```

### 4. Откройте в браузере

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8040

---

## 🐳 Запуск через Docker

### Первый запуск (сборка образов)

```bash
docker compose up --build
```

### Последующие запуски

```bash
docker compose up
```

### Запуск в фоновом режиме

```bash
docker compose up -d
```

### Просмотр логов

```bash
docker compose logs -f
```

### Остановка проекта

```bash
docker compose down
```

### Сброс БД и пересоздание контейнеров

```bash
docker compose down -v
docker compose up --build
```

---

## 💻 Локальная разработка

### Backend

```bash
cd backend

# Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows

# Установка зависимостей
pip install -r requirements.txt

# Запуск сервера
uvicorn main:app --reload --host 0.0.0.0 --port 8040
```

**Backend доступен**: http://localhost:8040

**Swagger документация**: http://localhost:8040/docs

### Frontend

```bash
cd frontend

# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

**Frontend доступен**: http://localhost:5173

### Database (локально)

```bash
# Запуск PostgreSQL через Docker
docker run -d \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  postgres:16
```

**Connection string**: `postgresql://myuser:mypassword@localhost:5432/mydb`

---

## 📊 Заполнение БД тестовыми данными

После запуска backend выполните:

```bash
docker compose exec backend python test_db.py
```

Или локально (в виртуальном окружении backend):

```bash
cd backend
python test_db.py
```

---

## 📡 API Документация

### Основные эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| `POST` | `/api/login` | Вход пользователя |
| `POST` | `/api/register` | Регистрация нового пользователя |
| `GET` | `/api/profile` | Получение профиля текущего пользователя |
| `GET` | `/api/events` | Список всех событий |
| `GET` | `/api/news` | Список новостей |
| `GET` | `/api/team?team_id=1` | Информация о команде |
| `GET` | `/api/user?user_id=1` | Информация о пользователе |
| `POST` | `/api/logout` | Выход из системы |
| `GET` | `/api/refresh` | Обновление JWT токена |

### Swagger UI

Полная интерактивная документация доступна по адресу:
**http://localhost:8040/docs**

### Redoc

Альтернативная документация:
**http://localhost:8040/redoc**

---

## 🔧 Конфигурация

### Переменные окружения Backend

| Переменная | Значение по умолчанию | Описание |
|------------|----------------------|----------|
| `DATABASE_URL` | `postgresql://myuser:mypassword@postgres:5432/mydb` | Строка подключения к БД |
| `SECRET_KEY` | `your-secret-key` | Секретный ключ для JWT |

### Переменные окружения Frontend

Файл: `frontend/.env`

| Переменная | Значение | Описание |
|------------|----------|----------|
| `VITE_API_URL` | `http://localhost:8040/api` | URL backend API |

---

## 🐛 Решение проблем

### Frontend не подключается к Backend

1. Убедитесь, что backend запущен: `docker compose ps`
2. Проверьте логи: `docker compose logs backend`
3. Проверьте CORS настройки в `backend/main.py`

### Ошибки базы данных

1. Пересоздайте БД: `docker compose down -v && docker compose up --build`
2. Проверьте логи PostgreSQL: `docker compose logs postgres`

### Port already in use

Если порт занят, измените его в `docker-compose.yml`:

```yaml
ports:
  - "8041:8040"  # Измените 8040 на другой порт
```

---



## 📝 Лицензия

Проект создан для образовательных целей.
