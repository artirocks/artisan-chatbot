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

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/chat-widget.git


## Technology Used

- **Python:** To build the API for the chat service.
- **GemeiniAI:** To handle message responses and act as the chatbot.
- **FastAPI:** For creating the API endpoints and managing asynchronous communication.
- **React:** For building the user interface of the chat widget.
- **Chakra UI:** For styling the chat widget and ensuring a responsive, modern design.
- **OAuth2:** For implementing secure authentication and authorization.

# Project Structure
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
└── README.md

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

### Run APIs
`python -m uvicorn main:app`

NOTE: Gemini API_KEY is shared via mail.

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
