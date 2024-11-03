from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

class ItemText(BaseModel):
   text: str

class ItemNewText(BaseModel):
   newText: str

app = FastAPI()


responses = {
    "hello": "Hi there!",
    "how are you?": "I'm just a program, but thanks for asking!",
    "bye": "Goodbye!",
    "hi": "Hello!",
    "hey": "Hi, what's up?",
    "create report for this month": "Ok, I'm working on it!",
    "create report for this week":  "Got it! One second I'll get that report for you",
    "call lead": "Ok, calling lead, I'll send a status report soon.", # type: ignore
    "what's our current bounce rate?":  "Our bounce rate is 0%, congrats!"
}

suggestions = {
    "Create report for this month",
    "Create report for this week",
    "Call lead",
    "What's our current bounce rate?"
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

@app.get("/suggestion")
async def chat():
    first_suggestion = random.choice(list(suggestions))
#    second_suggestion = random.choice(list(suggestions))
#    while second_suggestion == first_suggestion:
#       second_suggestion = random.choice(list(suggestions))
#    return {"response": {"suggestion1": first_suggestion, "suggestion2": second_suggestion}}
    return {"response": first_suggestion}

@app.post("/chat")
async def chat(item: ItemText):
   response = responses.get(item.text.lower(), "Sorry, I didn't understand that.")
   return {"response": response}

@app.post("/edit")
async def chat(item: ItemNewText):
   response = responses.get(item.newText.lower(), "Sorry, I didn't understand that.")
   return {"response": response}

