from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Mock database
fake_users_db = {
    "k.artiism06@gmail.com": {
        "username": "Arti",
        "email": "k.artiism06@gmail.com",
        "hashed_password": pwd_context.hash("password123"),
    }
}

class User(BaseModel):
    username: str
    email: EmailStr
    password: str

# Dummy token for example
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(email: str, password: str):
    user = fake_users_db.get(email)
    if not user or not verify_password(password, user["hashed_password"]):
        return False
    return user

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": user["email"], "token_type": "bearer"}

@router.post("/signup")
async def signup(user: User):
    print("Here")
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Store the user in the database with hashed password
    fake_users_db[user.email] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": pwd_context.hash(user.password),
    }
    return {"message": "User registered successfully"}

