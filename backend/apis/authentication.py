import json
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
import os

from models.models import User

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# File path for the JSON database
DB_FILE = "C:\\Users\\karti\\OneDrive\\Desktop\\projects\\artisan-chatbot\\backend\\db\\users_db.json"

# Function to load users from the JSON file
def load_users_db():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as file:
            return json.load(file)
    else:
        return {}

# Function to save users to the JSON file
def save_users_db(users):
    with open(DB_FILE, "w") as file:
        json.dump(users, file, indent=4)

# Load users into a variable when the app starts
users_db = load_users_db()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(email: str, password: str):
    users_db = load_users_db()
    user = users_db.get(email)
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
    # Reload the users_db in case other users have been added since the app started
    users_db = load_users_db()

    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Store the user in the database with hashed password
    users_db[user.email] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": pwd_context.hash(user.password),
    }
    
    # Save the updated users to the JSON file
    save_users_db(users_db)
    
    return {"message": "User registered successfully"}

# Load the JSON database when the application starts
users_db = load_users_db()
