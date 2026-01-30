from fastapi import APIRouter, Depends, HTTPException
from database import db
from utils.deps import get_current_user

router = APIRouter(prefix="/urls", tags=["urls"])

from fastapi import Depends, Query
from datetime import datetime
from typing import Optional

@router.get("/history")
def get_history(
    user_id: str = Depends(get_current_user),

    # Pagination
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),

    # Filtering
    search: Optional[str] = None,
    from_date: Optional[datetime] = None,
    to_date: Optional[datetime] = None,
):
    urls = db["urls"]

    skip = (page - 1) * limit

    # 🔍 Base query
    query = {"user_id": user_id}

    # 🔎 Search filter
    if search:
        query["$or"] = [
            {"original_url": {"$regex": search, "$options": "i"}},
            {"short_code": {"$regex": search, "$options": "i"}},
        ]

    # 📅 Date filter
    if from_date or to_date:
        query["created_at"] = {}
        if from_date:
            query["created_at"]["$gte"] = from_date
        if to_date:
            query["created_at"]["$lte"] = to_date

    # 📦 Fetch paginated results
    results = (
        urls.find(query, {"_id": 0})
        .sort("created_at", -1)
        .skip(skip)
        .limit(limit)
    )

    # 🔢 Total count (for pagination UI)
    total = urls.count_documents(query)

    return {
        "data": list(results),
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": (total + limit - 1) // limit,
        }
    }

@router.delete("/{short_code}")
def delete_url(
    short_code: str,
    user_id: str = Depends(get_current_user)
):
    urls = db["urls"]

    result = urls.delete_one({
        "short_code": short_code,
        "user_id": user_id
    })

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="URL not found or not authorized"
        )

    return {"message": "URL deleted successfully"}

@router.get("/history/stats")
def get_history_stats(user_id: str = Depends(get_current_user)):
    urls = db["urls"]

    pipeline = [
        {"$match": {"user_id": user_id}},
        {
            "$group": {
                "_id": None,
                "total_links": {"$sum": 1},
                "total_clicks": {"$sum": {"$ifNull": ["$clicks", 0]}},
            }
        },
        {
            "$project": {
                "_id": 0,
                "total_links": 1,
                "total_clicks": 1,
                "average_clicks": {
                    "$cond": [
                        {"$eq": ["$total_links", 0]},
                        0,
                        {"$round": [{"$divide": ["$total_clicks", "$total_links"]}, 0]},
                    ]
                },
            }
        },
    ]

    result = list(urls.aggregate(pipeline))
    return result[0] if result else {
        "total_links": 0,
        "total_clicks": 0,
        "average_clicks": 0,
    }


