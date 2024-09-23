# Installation Instructions

## Prerequisites

- **Node.js**: v14.x or higher
- **Python**: v3.7 or higher
- **SQLite**: Built-in with Python, no external installation needed
- **Git**: For version control and cloning the repository

## Backend Installation

1. **Clone the Repository**:
   Clone the repository using Git:

   ```bash
   git clone https://github.com/yourusername/CHATBOT_WITH_GPT2.git
   cd CHATBOT_WITH_GPT2/backend

2. **Create a Virtual Environment: Create and activate a virtual environment**:

    ```bash
    python -m venv venv4CHATBOT_WITH_GPT2
    source venv4CHATBOT_WITH_GPT2/Scripts/activate  # On Windows

4. **Install Python Dependencies: Install the backend dependencies**:

    ```bash
    pip install -r requirements.txt


5. **Run the Backend: Start the FastAPI server**:

    ```bash
    uvicorn app.main:app --reload



## Frontend Installation**

1. **Navigate to the Frontend**:

    ```bash
    cd ../frontend

2. **Install Node.js Dependencies**:

    ```bash
    npm install


3. **Run the Frontend: Start the React development server**:

    ```bash
    npm start
