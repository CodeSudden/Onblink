from fastapi import APIRouter, HTTPException
from models.user import UserCreate
from utils.security import hash_password, verify_password
from database import db
from datetime import datetime
from utils.jwt import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register(user: UserCreate):
    users = db["users"]

    if users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    password_hash = hash_password(user.password)

    users.insert_one({
        "email": user.email,
        "password_hash": password_hash,
        "created_at": datetime.utcnow()
    })

    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: UserCreate):
    users = db["users"]

    db_user = users.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(user.password, db_user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({
        "sub": str(db_user["_id"])
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }
