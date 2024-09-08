from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apis.geminiai import router as bot_router
from apis.authentication import router as authentication_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(bot_router, prefix="/bot", tags=["Bot"])
app.include_router(authentication_router, prefix="/authenticate", tags=["Bot"])
