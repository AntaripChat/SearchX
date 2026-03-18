from fastapi import APIRouter
from models.document_model import Document
from services.mongo_service import insert_document
from services.elastic_service import index_document

router = APIRouter()


@router.post("/documents")
def create_document(doc: Document):
    doc_dict = doc.dict()

    # Save in MongoDB
    doc_id = insert_document(doc_dict)

    # ✅ Create clean document for Elasticsearch
    es_doc = {
        "title": doc_dict["title"],
        "content": doc_dict["content"]
    }

    # Index in Elasticsearch
    index_document(doc_id, es_doc)

    return {"message": "Document created", "id": doc_id}