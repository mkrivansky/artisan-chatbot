# How to Run & Test My Code

Create Virtual Environment
```python -m venv venv```
```source venv/bin/activate```
Install FastAPI & Uvicorn
```pip install requirements.txt```
Start the server
```uvicorn main:app --reload```

In another terminal window, Start React App
```cd chatbot-frontend```
```npm install```
```npm start```

Should be running on 
http://localhost:3000

# My Approach
Started by refamiliarizing myself with React and then just dove into making the chatbot. I started with getting the backend working and testing manually by sending requests to the API with Thunder client. Then I started on the frontend, made some progress but had to double back because I realized I wasn't using Typescript, did some refactoring to fix it. Then I added in the edit and delete functionality which was tricky but I ended up making some design decisions for it to make sense (ie. when the user edits a message, Ava should update the response to that message). I spent more time on the front end and making some refactoring changes so the project was cleaner. I ended up taking a long break to focus on work but have been actively applying and interviewing at different startups and ended up reapplying to Artisan. Tina reached out asking if I had completed the take home assessment Lastly, I made some UI updates (I learned a lot more about css and styling in react since I first started working on this). So I added some finishing touches to the UI and some small refactoring changes.

## Backend
I made a simple FastAPI backend so I could begin testing my code. Then moved on to more "complex" functionality, basically I just used a python dictionary to store Ava's responses to certain user messages, and default responses if the user message didn't match any of the keys in the dictionary. 

## Frontend
I created a react app and just wanted to get basic message functionality working. I made a simple component for chatting with Ava that incorporated the edit and delete functionality as well as suggested messages. I tried to recreate the given UI as best as I could but realized i was spending too much time on it, I probably would've preferred to build  out the  backedn chatbot more but wanted to try to learn more about react and typescript. Cursor and ChatGPT were my best friends for this. 

## Testing
I added some React tests with the help of ChatGPT. Not all the tests pass but it was a good start.
