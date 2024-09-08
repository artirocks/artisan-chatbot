import google.generativeai as genai
from fastapi import APIRouter, HTTPException
import os
from pydantic import BaseModel

genai.configure(api_key="API_KEY")

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str
    document_path: str = "..\\docs\\background.txt"  # Path to the document on disk

class ModelResponse(BaseModel):
    generated_text: str

# Initialize the generative model
model = genai.GenerativeModel("gemini-1.5-flash")

# Helper function to read the document from disk
def read_document_from_file(file_path: str) -> str:
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Document at path {file_path} not found")
    
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# API endpoint to generate content
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
        response = model.generate_content(full_prompt)

        # Return the generated text
        return {"generated_text": response.text}

    except Exception as e:
        # Handle errors
        raise HTTPException(status_code=500, detail=f"Model generation failed: {str(e)}")

