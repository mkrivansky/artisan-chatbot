from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class ItemMessage(BaseModel):
   message: str

class ItemNewMessage(BaseModel):
   newMessage: str

app = FastAPI()


responses = {
    "hello": "Hi there!",
    "how are you?": "I'm just a program, but thanks for asking!",
    "bye": "Goodbye!",
    "hi": "Hello!",
    "hey": "Hi, what's up?"
}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
   return {"Hello": "World"}

@app.post("/chat")
async def chat(item: ItemMessage):
   response = responses.get(item.message.lower(), "Sorry, I didn't understand that.")
   return {"response": response}

@app.post("/edit")
async def chat(item: ItemNewMessage):
   response = responses.get(item.newMessage.lower(), "Sorry, I didn't understand that.")
   return {"response": response}

