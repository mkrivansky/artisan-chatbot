from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Item(BaseModel):
   message: str

app = FastAPI()


responses = {
    "hello": "Hi there!",
    "how are you?": "I'm just a program, but thanks for asking!",
    "bye": "Goodbye!"
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
async def chat(item: Item):
   response = responses.get(item.message.lower(), "Sorry, I didn't understand that.")
   return {"response": response}
   # return {"response": f"You said: {message}"}

