from elasticsearch import Elasticsearch

# ✅ simple client (no headers)
es = Elasticsearch("http://localhost:9200")

INDEX_NAME = "documents"


def create_index():
    try:
        es.indices.create(
            index=INDEX_NAME,
            mappings={
                "properties": {
                    "title": {"type": "text"},
                    "content": {"type": "text"}
                }
            }
        )
        print("✅ Index created")

    except Exception as e:
        if "resource_already_exists_exception" in str(e):
            print("ℹ️ Index already exists")
        else:
            print("❌ Elasticsearch error:", e)


def index_document(doc_id, document):
    try:
        es.index(index=INDEX_NAME, id=doc_id, document=document)
        print("✅ Document indexed:", doc_id)
    except Exception as e:
        print("❌ Indexing error:", e)


def search_document(query):
    try:
        response = es.search(
            index=INDEX_NAME,
            query={
                "multi_match": {
                    "query": query,
                    "fields": ["title", "content"]
                }
            }
        )
        return response
    except Exception as e:
        print("❌ Search error:", e)
        return {"hits": {"hits": []}}