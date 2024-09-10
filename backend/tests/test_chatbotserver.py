import pytest
from fastapi.testclient import TestClient
from app.apis.chatbotserver import router, load_message_store, save_message_store
from models.models import PromptRequest, SaveRequest, Message
import os
import json

client = TestClient(router)

def mock_generate_text(request):
    return "Generated response text"

message_store_mock = {
    "user123": [
        {"role": "user", "content": "Hello"},
        {"role": "bot", "content": "Hi, how can I help you?"}
    ]
}

@pytest.fixture
def mock_load_message_store(monkeypatch):
    def mock_load():
        return message_store_mock
    monkeypatch.setattr("app.apis.chatbotserver.load_message_store", mock_load)

@pytest.fixture
def mock_save_message_store(monkeypatch):
    def mock_save(store):
        pass 
    monkeypatch.setattr("app.apis.chatbotserver.save_message_store", mock_save)


@pytest.mark.asyncio
async def test_generate_text(monkeypatch):
    monkeypatch.setattr("app.apis.chatbotserver.generate_text", mock_generate_text)

    request_data = {
        "prompt": "Can you generate text?",
        "context": "Context information"
    }
    
    response = client.post("/generate/", json=request_data)
    
    assert response.status_code == 200
    assert response.json() == {"generated_text": "Generated response text"}


@pytest.mark.asyncio
async def test_save_messages(mock_load_message_store, mock_save_message_store):
    save_request = {
        "user_id": "user123",
        "user_message": {
            "role": "user",
            "content": "How are you?"
        },
        "bot_message": {
            "role": "bot",
            "content": "I'm doing well, thank you!"
        }
    }
    
    response = client.post("/save/", json=save_request)
    
    assert response.status_code == 200
    assert response.json() == {"message": "Messages saved successfully"}


@pytest.mark.asyncio
async def test_get_message_history(mock_load_message_store):
    response = client.get("/history/user123/")
    
    assert response.status_code == 200
    assert response.json() == [
        {"role": "user", "content": "Hello"},
        {"role": "bot", "content": "Hi, how can I help you?"}
    ]


def test_load_message_store(tmpdir, monkeypatch):
    file = tmpdir.join("message_store.json")
    file.write(json.dumps(message_store_mock))

    def mock_path():
        return str(file)
    monkeypatch.setattr("app.apis.chatbotserver.MESSAGE_STORE_FILE", mock_path())

    loaded_store = load_message_store()
    assert loaded_store == message_store_mock


def test_save_message_store(tmpdir, monkeypatch):
    file = tmpdir.join("message_store.json")

    def mock_path():
        return str(file)
    monkeypatch.setattr("app.apis.chatbotserver.MESSAGE_STORE_FILE", mock_path())

    save_message_store(message_store_mock)
    
    with open(mock_path(), "r") as f:
        data = json.load(f)
        assert data == message_store_mock
