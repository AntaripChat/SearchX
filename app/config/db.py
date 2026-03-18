from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017"

client = MongoClient(MONGO_URI)

db = client["search_engine"]

documents_collection = db["documents"]