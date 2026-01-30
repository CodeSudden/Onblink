from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import string
import random
from routes.auth import router as auth_router
from database import db
from utils.deps import get_current_user_optional
from fastapi import Depends
from fastapi import HTTPException
from routes.url import router as url_router
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(url_router)
app.include_router(auth_router)

class URLItem(BaseModel):
    original_url: str

url_collection = db["urls"]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/shorten")
def shorten_url(
    item: URLItem,
    user_id: str | None = Depends(get_current_user_optional)
):
    url = item.original_url
    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    short_code = ''.join(
        random.choice(string.ascii_letters + string.digits)
        for _ in range(6)
    )

    url_collection.insert_one({
        "short_code": short_code,
        "original_url": url,
        "user_id": user_id,   # None if guest
        "clicks": 0,
        "created_at": datetime.utcnow(),
        "last_clicked_at": None
    })

    return {
        "short_url": f"http://localhost:8000/{short_code}"
    }

@app.get("/{code}")
def resolve_short_url(code: str):
    doc = url_collection.find_one({"short_code": code})

    if not doc:
        raise HTTPException(status_code=404, detail="URL not found")

    # OPTIONAL: expiration check
    if doc.get("expires_at") and doc["expires_at"] < datetime.utcnow():
        raise HTTPException(status_code=410, detail="URL expired")

    # Track analytics
    url_collection.update_one(
        {"_id": doc["_id"]},
        {
            "$inc": {"clicks": 1},
            "$set": {"last_clicked_at": datetime.utcnow()}
        }
    )

    return {
        "original_url": doc["original_url"],
        "expired": False
    }
