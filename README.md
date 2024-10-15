# Readme for Artisan chatbot trial task.

# https://artisanai.notion.site/Full-stack-Async-Exercise-58da5061b8904b28b747f468ff096feb

## 🗒️ Assignment

You need to develop a chat widget that allows users to send messages to a chatbot. The widget should support the following actions:

- Send a message
    - The chatbot should respond with a message
        - You can decide how to implement this chatbot. It could be as simple or as complex as you’d like. Ultimately, sending a message to the chatbot should return a response
- Delete message
    - The user can delete a message that they’ve sent
- Edit message
    - The user can edit the message they’ve sent
- UI design
    - Use the image above as a guide to the design of the chat app. We’ll leave it up to you on how accurate you want to match the design above.

Hint

- You can follow RESTful api endpoints for this

## 🏁 How to complete the exercise

If you have any questions before starting or during the exercise, please send them to us. We will get back to you with the answers as soon as possible.

Use git to commit your code as you would normally work on a project, this would help us to understand your work process. Please organize, design, test, and document your code as if the feature was going into production.

Once you are done, we ask you to present your work asynchronously. P**lease upload your solution** onto GitHub so that we can review it. You can write documentation explaining your approach and solution or record a video — it’s up to you to present your work best! Our team is mostly async so communication is extremely important to us.

After it’s done, we will do an internal code review for your code and share feedback with you over email. If we like what we see, we will invite you to the technical interview with the team to discuss your solution further along with other technical topics.

## ⚙️ Technical Requirements

Please follow these technical requirements.

- For the UI, please use React and TypeScript. For the API, please use Python and FastAPI Other than that, you are fully flexible in how you approach the task. You might want to consider adding a data persistence layer or caching. That is up to you.
- Be minimalistic with additional dependencies. You can be the judge of what’s needed and what’s not.
- Use git to commit your code as you would normally work on a project. This is helpful for us to understand your workflow and thinking process.
- Feel free to make UI changes that you think is best for the user.
- We must be able to test your solution, i.e. run it locally by cloning it from Github or access it on some public url like Heroku.

## 🔍 What we are looking for

When assessing the results, these are the main areas we will be looking at. It does not need to be perfect. We will be assessing it holistically. 

These are the areas we are generally interested in: 

- The feature is complete and works according to requirements. It is stable, and edge cases are handled in a sensible, thought-out manner. There is error handling and authentication is considered.
- The code is well organized, easy to understand and readable, it follows best practices. Your work process is visible through the commit history and documentation.
- Feature implemented in a user-friendly, UI looks cohesive and delightful. Feel free to make changes in the UI design if you feel they would improve the experience. Bonus points if it is also accessible!
- We’d love to see some automated tests. You don’t need to aim for 100% test coverage, but we’d like to get a sense of your approach to automated testing.
- Mostly importantly, we want to see your communication style throughout the project. As mentioned previous, we are a distributed team so **communication is extremely important** to us.

# How to Run & Test My Code

Create Virtual Environment
```python -m venv venv```
```source venv/bin/activate```
Install FastAPI & Uvicorn
```pip install fastapi uvicorn```
Start the server
```uvicorn main:app --reload```

In another terminal window, Start React App
```cd chatbot-frontend```
```npm start```

Should be running on 
http://localhost:3000