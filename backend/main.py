from fastapi import FastAPI, Request, Form, HTTPException, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Cookie

from pydantic import BaseModel

from typing import List, Dict

from scripts.models import *
from scripts.db import *
from scripts.auth import get_current_user, create_access_token
from scripts.createdb import init_db_enums
from scripts.db import add_user, user_info

from sqlalchemy import text

import bcrypt

templates = Jinja2Templates(directory="templates")
init_db_enums()
app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8040", "http://0.0.0.0:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    nickname: str
    firstname: str
    secondname: str
    lastname: str      
    university: str
    email: str
    contact: str
    password: str
    confirmPassword: str

class UserResponse(BaseModel):
    id: int
    email: str
    nickname: str

# ======= ОСНОВНАЯ СТРАНИЦЫ =======
@app.get("/", response_class=HTMLResponse)
async def main(request: Request):
    pass


# ======= ЛИЧНЫЙ КАБИНЕТ =======
@app.get("/api/profile")
async def get_profile(current_user = Depends(get_current_user)):
    return user_info(current_user.id)

#определенный юзер
@app.get("/api/user", response_model=Dict)
async def api_user(reqeust: Request, user_id: int):
    profile = user_info(user_id)
    return profile



# ======= СОБЫТИЕ =======
@app.get("/api/events", response_model=List)
async def api_event(request: Request):
    events = all_events()
    return events


# ======= Новости =======
@app.get('/api/news', response_model=List)
async def api_news(request: Request):
    news = all_newses()
    return news


# ======= Новости =======
@app.get('/api/team', response_model=Dict)
async def api_team(request: Request, team_id: int = 1):
    team = team_info(1)
    return team


@app.post("/api/logout")
async def logout(response: Response):
    return {"message":"Успешно"}

# ======= АВТОРИЗАЦИЯ =======
@app.post("/api/login")
async def api_login(body: LoginRequest):
    session = create_session()
    user = session.query(Users).filter(Users.email == body.email).first()
    session.close()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    if not bcrypt.checkpw(body.password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Wrong password")

    token = create_access_token({"sub": str(user.id)})
    return {
        "accessToken": token,
        "user": user_info(user.id)
    }


# ======= РЕГИСТРАЦИЯ =======
@app.post("/api/register")
async def api_register(body: RegisterRequest):
    if body.password != body.confirmPassword:
        raise HTTPException(status_code=400, detail="Пароли не совпадают")
    
    hashed_password = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt()).decode()
    
    user_data = {
        "nickname": body.nickname,
        "firstname": body.firstname,
        "secondname": body.secondname,
        "lastname": body.lastname,
        "email": body.email,
        "contact": body.contact,
        "organization": body.university,
        "password_hash": hashed_password,
        "bio": "",
    }

    added = add_user(user_data)
    if not added:
        raise HTTPException(status_code=400, detail="Ошибка при создании пользователя")

    session = create_session()
    user = session.query(Users).filter(Users.email == body.email).first()
    session.close()

    token = create_access_token({"sub": str(user.id)})
    
    return {
        "accessToken": token,
        "user": user_info(user.id)
    }


# ======= АДМИН =======
@app.get("/admin", response_class=HTMLResponse)
async def admin(request: Request):
    pass


#рефреш токена
@app.get("/api/refresh")
async def api_refresh(current_user = Depends(get_current_user)):
    new_token = create_access_token({"sub": str(current_user.id)})
    return {
        "accessToken": new_token,
        "user": user_info(current_user.id)
    }
