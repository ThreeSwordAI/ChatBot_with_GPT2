# CHATBOT-WITH-GPT2

## Overview

CHATBOT-WITH-GPT2 is a chat application that combines traditional chat functionalities with modern AI capabilities. The application supports real-time messaging between users, user authentication and includes an auto-generated text feature powered by GPT-2. This project is built with a full-stack approach using React for the frontend, FastAPI for the backend and SQLite as the database.

## Features

### 1. **User Authentication**
   - **Sign Up**: Users can create an account with a unique username and password.
   - **Login**: Secure login functionality with session persistence.
   - **Error Handling**: Informative error messages for issues like incorrect passwords or duplicate usernames.

### 2. **Chat Functionality**
   - **Real-Time Messaging**: Users can send and receive messages in real-time.
   - **Chat History**: Each user's chat history is stored and can be viewed upon logging in.
   - **User List**: Easily accessible list of all users a particular user has communicated with, along with a search feature to find other users.

### 3. **AI-Powered Text Generation**
   - **GPT-2 Integration**: Users can leverage the power of GPT-2 to auto-generate text responses.
   - **Auto-Generate Button**: In the chat interface, users can click on "AutoGenerate" to receive AI-generated suggestions based on their input.

### 4. **Responsive Design**
   - The application is designed to be fully responsive, working seamlessly across devices of different sizes.

### 5. **Database Integration**
   - **SQLite**: Persistent storage of user data, messages, and chat history.
   - **Scalability**: The structure can be easily migrated to other relational databases like MySQL or PostgreSQL.

## Project Structure

```plaintext
CHATBOT-WITH-GPT2/
│
├── backend/
│   ├── app/
│   │   ├── main.py                # FastAPI main application file
│   │   ├── models.py              # Database models using SQLAlchemy
│   │   ├── schemas.py             # Pydantic models for request and response validation
│   │   ├── crud.py                # CRUD operations
│   │   └── ...                    # Additional files
│   ├── venv4CHATBOT_WITH_GPT2/    # Python virtual environment
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.tsx        # Chat interface component
│   │   │   ├── ChatList.tsx       # Component to list chat users
│   │   │   ├── Login.tsx          # Login form component
│   │   │   ├── Signup.tsx         # Signup form component
│   │   │   └── AutoGenerate.tsx   # GPT-2 Auto-generation component
│   │   ├── App.tsx                # Main application component
│   │   └── ...                    # Additional files
│   └── ...                        # Additional files
│
├── docs/
│   ├── INSTALLATION.md            # Installation instructions
│   ├── USAGE.md                   # How to use the application
│   └── DEPENDENCIES.md            # List of dependencies
│
├── README.md                      # Project overview and documentation
└── .gitignore                     # Git ignore file

