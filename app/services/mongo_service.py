from config.db import documents_collection

def insert_document(data):
    result = documents_collection.insert_one(data)
    return str(result.inserted_id)