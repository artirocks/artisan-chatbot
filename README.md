# Chat Widget Project

## Overview

This project involves developing a chat widget that allows users to interact with a chatbot. The widget supports various functionalities, including sending and receiving messages, editing and deleting messages. Additionally, the project includes authentication for secure access to the chat service.

## Key Features

### 1. Authentication

- **Secure Access:** Users must authenticate before accessing the chat widget. This ensures that only authorized individuals can send and receive messages. Used OAuth2.

### 2. Chatbot Messaging Service

- **Send a Message:**
  - Users can send messages to the chatbot through the widget.
  - After sending a message, the chatbot generates and sends back a relevant response.

- **Receive a Response:**
  - The chatbot processes incoming messages and provides appropriate responses based on the content of the messages.

- **Delete a Message:**
  - Users have the ability to delete any message they have sent.
  - Once deleted, the message is removed from the chat history and underlying storage.

- **Edit a Message:**
  - Users can edit messages they have previously sent.
  - Edited messages are updated in the chat history, ensuring that the most recent content is displayed.

## Technology Used

- **Python:** To build the API for the chat service.
- **GemeiniAI:** To handle message responses and act as the chatbot.
- **FastAPI:** For creating the API endpoints and managing asynchronous communication.
- **React:** For building the user interface of the chat widget.
- **Chakra UI:** For styling the chat widget and ensuring a responsive, modern design.
- **OAuth2:** For implementing secure authentication and authorization.

## High Level Flow
<div style="display: flex; flex-wrap: wrap;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/0%20Hig%20Level%20Workflow%20.png" alt="High level Architecture" style="width: 600px; margin-right: 5px;">
</div>

## Demo Video
[Demo Video Link](https://drive.google.com/file/d/1zw95kjAP4jHNfxj7VxR33qjt07IAUpHX/view?usp=sharing)
[![Watch the video](https://github.com/artirocks/artisan-chatbot/blob/main/snaps/1%20HomePage.png)](https://drive.google.com/file/d/1zw95kjAP4jHNfxj7VxR33qjt07IAUpHX/view?usp=sharing)

## Snaps

<div style="display: flex; flex-wrap: wrap;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/1%20HomePage.png" alt="Home Page" style="width: 300px; margin-right: 5px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/2%20Sign%20up%20page.png" alt="Sign Up Page" style="width: 300px; margin-right: 5px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/3%20User%20Signed%20Up.png" alt="User Signed Up" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/4%20User%20Logged%20In.png" alt="User Logged In" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/3%20User%20Signed%20Up.png" alt="Dashboard visible to Logged in user" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/6%20Chatbot%20Interface.png" alt="Chatbot Interface" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/7%20Chatbot%20answers%20query.png" alt="Chatbot answer Query" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/8%20Chatbot%20answer%20query%202.png" alt="Chatbot answers Query 2" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/9%20Chatbot%20answer%20query%203.png" alt="Chatbot Answer Query 3" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/10%20Edit%20and%20Delete%20Options.png" alt="Edit and Delete Option" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/11%20Deleted%20query%202.png" alt="Delete Query 2" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/12%20Edited%20query%203.png" alt="Edited Query 3" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/13%20Response%20of%20edited%20query.png" alt="Response of edited query" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/14%20Closed%20chatbot.png" alt="Closed Chatbot" style="width: 300px;">
  <img src="https://github.com/artirocks/artisan-chatbot/blob/main/snaps/15%20Fetch%20persisted%20Chat%20history.png" alt="Persisted Chat History" style="width: 300px;">
</div>


# Project Structure
```
ARTISAN-CHATBOT/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── apis
│   │   │   ├── __init__.py
|   |   |   ├── authentication.py
│   │   │   └── chatbotserver.py
│   │   ├── gen_ai_models
|   |   |   |── gemeiniai.py
|   |   |   └── docs
|   |   |       └──artisan_background.txt
│   │   └── models
|   |       └──models.py
|   |── db
│   │   ├── message_store.json
│   │   └── users_db.json
|   |── tests
│   │   ├── test_authentication.py
│   │   └── test_chatbotserver.py
│   ├── requirements.txt
|   |── .gitignore
│   └── README.md   
│
├── ui/artisan
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── AvaChatbot.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── HomePage.js
│   │   │   ├── Signin.js
│   │   │   └── Signup.js
│   │   ├── pages/
│   │   │   └── HomePage.js
│   │   ├── themes
│   │   │   └── App.css
│   │   |── assests
│   │   |   └── img
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.tsx
│   ├── package.json
│   └── README.md
│
├── .gitignore
|── README.md
│
|── snaps 
    └── Product Images
```

# Project Setup

## Backend

### Create Virtual env
`python -m venv venv`

### Activate venv

Mac-OS
`source venv/bin/activate`

Windows
`.\venv\Scripts\activate.bat`

### Install Dependencies

`pip install -r requirements.txt`

### Update .env file
Add GOOGLE_API_KEY in backed .env file. It has been shared via email.

### Run APIs
`python -m uvicorn main:app`

*NOTE: To use Gemini model GOOGLE_API_KEY is required which has been shared via email.*

## UI

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
