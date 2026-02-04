from fastapi import APIRouter, HTTPException, Response, Request
from models.user import UserCreate
from utils.security import hash_password, verify_password
from database import db
from datetime import datetime
from utils.jwt import (
    create_access_token,
    create_refresh_token,
    decode_token
)

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
def login(user: UserCreate, response: Response):
    users = db["users"]

    db_user = users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token({
        "sub": str(db_user["_id"])
    })

    refresh_token = create_refresh_token({
        "sub": str(db_user["_id"])
    })

    # 🔓 Access token (readable by middleware)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=False,      # middleware needs this
        samesite="lax",
        secure=False,        # True in prod
        path="/",
        max_age=15 * 60
    )

    # 🔐 Refresh token (HttpOnly)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite="lax",
        secure=False,
        path="/",
        max_age=7 * 24 * 60 * 60
    )

    return {"message": "Login successful"}


@router.post("/refresh")
def refresh(request: Request, response: Response):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=401, detail="Missing refresh token")

    payload = decode_token(refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access_token = create_access_token({
        "sub": payload["sub"]
    })

    new_refresh_token = create_refresh_token({
        "sub": payload["sub"]
    })

    response.set_cookie(
        key="access_token",
        value=new_access_token,
        httponly=False,
        samesite="lax",
        secure=False,
        path="/",
        max_age=15 * 60
    )

    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        samesite="lax",
        secure=False,
        path="/",
        max_age=7 * 24 * 60 * 60
    )

    return {"message": "Token refreshed"}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    
    return {"message": "Logged out"}


