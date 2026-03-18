from fastapi import APIRouter
from services.elastic_service import search_document

router = APIRouter()


@router.get("/search")
def search(q: str):
    results = search_document(q)

    hits = results["hits"]["hits"]

    return [
        {
            "id": hit["_id"],
            "score": hit["_score"],
            "data": hit["_source"]
        }
        for hit in hits
    ]