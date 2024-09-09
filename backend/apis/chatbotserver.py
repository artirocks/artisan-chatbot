from typing import List
from fastapi import FastAPI, HTTPException, Depends, APIRouter
from pydantic import BaseModel
from typing import List, Dict

from datetime import datetime
# import geminiai 
router = APIRouter()

# In-memory store for demonstration purposes
message_store: Dict[str, List['Message']] = {}

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

@router.post("/generate/", response_model=ModelResponse)
async def generate_text(request: PromptRequest):
    try:
        # Check if a document path is provided
        document_content = ""
        if request.document_path:
            try:
                # Read the document from the file
                document_content = read_document_from_file(request.document_path)
            except FileNotFoundError as e:
                raise HTTPException(status_code=404, detail=str(e))
        
        # Combine document content (if any) with the prompt
        if document_content:
            full_prompt = f"Using the following information:\n{document_content}\nAnswer the following:\n{request.prompt}"
        else:
            full_prompt = request.prompt

        # Use the generative model to generate content based on the combined prompt and document
        # response = model.generate_content(full_prompt)

        # Return the generated text
        return {"generated_text": "Demo Response"}

    except Exception as e:
        # Handle errors
        raise HTTPException(status_code=500, detail=f"Model generation failed: {str(e)}")



@router.post("/save/")
async def save_messages(save_request: SaveRequest):
    # Fetch the current list of messages for the user (if any)
    if save_request.user_id not in message_store:
        message_store[save_request.user_id] = []  # Create a new list if user_id is new

    # Append both user and bot messages to the list for that user
    message_store[save_request.user_id].append(save_request.user_message)
    message_store[save_request.user_id].append(save_request.bot_message)
    
    return {"message": "Messages saved successfully"}

@router.get("/history/{user_id}/", response_model=List[Message])
async def get_message_history(user_id: str):
    # Return messages for the given user_id, or an empty list if none exist
    user_messages = message_store.get(user_id, [])
    return user_messages

def read_document_from_file(file_path: str) -> str:
    with open(file_path, 'r') as file:
        return file.read()

# To run the app, use: uvicorn filename:app --reload
