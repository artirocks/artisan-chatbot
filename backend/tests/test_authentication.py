import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient
from app.main import app
from models.models import User
import json

client = TestClient(app)

@pytest.fixture
def test_user():
    return {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpassword"
    }

@pytest.fixture
def override_load_users_db():
    # Mock users database to avoid file-based dependencies
    return {
        "testuser@example.com": {
            "username": "testuser",
            "email": "testuser@example.com",
            "hashed_password": "$2b$12$D4Jz6F.Mx7.8fRp7lDAvhubn2esWj6Y4X4Zxez4YO04xhmP1E24e6"  
        }
    }

@pytest.fixture
def override_save_users_db():
    def mock_save(users):
        pass
    return mock_save


@pytest.mark.asyncio
async def test_signup(test_user):
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/signup", json=test_user)
    assert response.status_code == 200
    assert response.json() == {"message": "User registered successfully"}

@pytest.mark.asyncio
async def test_login_success(override_load_users_db):
    form_data = {
        "username": "testuser@example.com",
        "password": "testpassword"
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/token", data=form_data)
    assert response.status_code == 200
    assert response.json()["access_token"] == "testuser@example.com"


@pytest.mark.asyncio
async def test_login_failure():
    form_data = {
        "username": "testuser@example.com",
        "password": "wrongpassword"
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/token", data=form_data)
    assert response.status_code == 400
    assert response.json() == {"detail": "Incorrect username or password"}
