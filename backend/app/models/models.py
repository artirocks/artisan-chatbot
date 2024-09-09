from pydantic import BaseModel, EmailStr
from typing import List

class Message(BaseModel):
    id: int
    text: str
    isBot: bool
    isDeleted: bool = False

class PromptRequest(BaseModel):
    prompt: str
    document_path: str = None

class ModelResponse(BaseModel):
    generated_text: str

class SaveRequest(BaseModel):
    user_id: str  # user_id to track messages per user
    user_message: Message
    bot_message: Message

class User(BaseModel):
    username: str
    email: EmailStr
    password: str
