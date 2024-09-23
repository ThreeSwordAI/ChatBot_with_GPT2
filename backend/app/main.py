# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud, gpt2_generator
from .database import SessionLocal, engine


from fastapi import FastAPI, Depends, HTTPException, status, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud, gpt2_generator
from .database import SessionLocal, engine
from fastapi import Query
#from fastapi import Request, HTTPException
#from fastapi import Depends



#from . import models, schemas, crud, gpt2_generator
#from .database import SessionLocal, engine
# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user_id():
   
    return 1  

# Signup Endpoint
@app.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    return crud.create_user(db, user)

# Login Endpoint
@app.post("/login", response_model=schemas.UserResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    authenticated_user = crud.authenticate_user(db, user.username, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    print(f"User logged in: {authenticated_user.id}")
    return authenticated_user

# Search Users
@app.get("/search_users", response_model=List[schemas.UserResponse])
def search_users(query: str, db: Session = Depends(get_db)):
    users = crud.search_users(db, query)
    return users

@app.get("/chat_history/{other_user_id}", response_model=List[schemas.MessageResponse])
def chat_history(
    other_user_id: int,
    user_id: int = Query(...),
    db: Session = Depends(get_db)
):
    print(f"chat_history endpoint called with user_id={user_id}, other_user_id={other_user_id}")
    messages = crud.get_messages_between_users(db, user_id, other_user_id)
    return messages

@app.post("/send_message", response_model=schemas.MessageResponse)
def send_message(
    message: schemas.MessageCreate,
    user_id: int = Query(...),
    db: Session = Depends(get_db)
):
    print(f"send_message endpoint called with user_id={user_id}, receiver_id={message.receiver_id}")
    return crud.create_message(db, message, user_id)


@app.get("/chat_partners", response_model=List[schemas.UserResponse])
def get_chat_partners(db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    users = crud.get_chat_partners(db, user_id)
    return users



@app.post("/autogenerate_text")
def autogenerate_text(payload: dict):
    prompt = payload.get('prompt', '')
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")
    generated_text = gpt2_generator.generate_text(prompt)
    return {"generated_text": generated_text}



@app.get("/chat_history/{other_user_id}", response_model=List[schemas.MessageResponse])
def chat_history(
    other_user_id: int,
    user_id: int = Query(...),
    db: Session = Depends(get_db)
):
    print(f"Backend received user_id: {user_id}, other_user_id: {other_user_id}")
    messages = crud.get_messages_between_users(db, user_id, other_user_id)
    return messages



@app.post("/send_message", response_model=schemas.MessageResponse)
def send_message(message: schemas.MessageCreate, db: Session = Depends(get_db), sender_id: int = Depends(get_current_user_id)):
    return crud.create_message(db, message, sender_id)
"""
def get_current_user_id(request: Request):
    user_id = request.query_params.get('user_id')
    if user_id is None:
        raise HTTPException(status_code=400, detail="user_id query parameter is required")
    try:
        user_id = int(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="user_id must be an integer")
    return user_id
"""