import json
from typing import List, Dict
from fastapi import FastAPI, HTTPException, Depends, APIRouter
from pydantic import BaseModel
from datetime import datetime
import os

from models.models import Message, PromptRequest, ModelResponse, SaveRequest
from gen_ai_models.geminiai import generate_text

router = APIRouter()

# Path to the JSON file where messages will be stored
MESSAGE_STORE_FILE = "C:\\Users\\karti\\OneDrive\\Desktop\\projects\\artisan-chatbot\\backend\\db\\message_store.json"

# Function to load messages from the JSON file
def load_message_store() -> Dict[str, List['Message']]:
    if os.path.exists(MESSAGE_STORE_FILE):
        with open(MESSAGE_STORE_FILE, "r") as file:
            return json.load(file)
    return {}

# Function to save messages to the JSON file
def save_message_store(store: Dict[str, List['Message']]):
    with open(MESSAGE_STORE_FILE, "w") as file:
        json.dump(store, file, indent=4, default=str)  # 'default=str' to handle datetime serialization

# Initialize message store by loading the existing data
message_store: Dict[str, List['Message']] = load_message_store()

@router.post("/generate/", response_model=ModelResponse)
async def get_response(request: PromptRequest):
    try:
        # Use the generative model to generate content based on the combined prompt and document
        response = await generate_text(request)

        # Return the generated text
        return {"generated_text": response}

    except Exception as e:
        # Handle errors
        raise HTTPException(status_code=500, detail=f"Model generation failed: {str(e)}")


@router.post("/save/")
async def save_messages(save_request: SaveRequest):
    # Fetch the current list of messages for the user (if any)
    if save_request.user_id not in message_store:
        message_store[save_request.user_id] = []  # Create a new list if user_id is new

    # Append both user and bot messages to the list for that user
    message_store[save_request.user_id].append(save_request.user_message.dict())
    message_store[save_request.user_id].append(save_request.bot_message.dict())

    # Save the updated message store to the JSON file
    save_message_store(message_store)
    
    return {"message": "Messages saved successfully"}

@router.get("/history/{user_id}/", response_model=List[Message])
async def get_message_history(user_id: str):
    # Return messages for the given user_id, or an empty list if none exist
    user_messages = message_store.get(user_id, [])
    return user_messages

def read_document_from_file(file_path: str) -> str:
    with open(file_path, 'r') as file:
        return file.read()

