# 🔍 Mini Search Engine (Google-style)

A scalable search engine backend built with **FastAPI, MongoDB, and Elasticsearch**, designed to simulate how modern search systems work.

---

## 🚀 Features

* 📄 Add and store documents
* 🔍 Full-text search with Elasticsearch
* ⚡ Fast query response with ranking
* 🗄️ Dual storage architecture (MongoDB + Elasticsearch)
* 🧠 Clean backend structure (services, routes, models)

---

## 🏗️ Architecture

```
User → FastAPI Backend → MongoDB (storage)
                           ↓
                     Elasticsearch (search index)
```

### Flow

#### 📝 Write Pipeline

```
POST /documents
→ Save to MongoDB
→ Index in Elasticsearch
```

#### 🔍 Read Pipeline

```
GET /search?q=...
→ Query Elasticsearch
→ Return ranked results
```

---

## 🛠️ Tech Stack

* **Backend**: FastAPI
* **Database**: MongoDB
* **Search Engine**: Elasticsearch (Docker)
* **Language**: Python

---

## 📁 Project Structure

```
search-engine-backend/
│
├── app/
│   ├── routes/
│   │   ├── document_routes.py
│   │   └── search_routes.py
│   │
│   ├── services/
│   │   ├── mongo_service.py
│   │   └── elastic_service.py
│   │
│   ├── models/
│   │   └── document_model.py
│   │
│   ├── config/
│   │   └── db.py
│   │
│   ├── main.py
│   └── server.py
│
├── requirements.txt
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-link>
cd search-engine-backend
```

---

### 2️⃣ Create Virtual Environment

```
python -m venv venv
venv\Scripts\activate
```

---

### 3️⃣ Install Dependencies

```
pip install -r requirements.txt
```

---

### 4️⃣ Start MongoDB

Make sure MongoDB is running locally:

```
mongodb://localhost:27017
```

---

### 5️⃣ Run Elasticsearch (Docker)

```
docker run -d --name elasticsearch ^
  -p 9200:9200 ^
  -e "discovery.type=single-node" ^
  -e "xpack.security.enabled=false" ^
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" ^
  elasticsearch:8.11.1
```

---

### 6️⃣ Run Server

```
python app/server.py
```

---

### 7️⃣ Open API Docs

```
http://localhost:8000/docs
```

---

## 📡 API Endpoints

### ➕ Add Document

```
POST /documents
```

#### Request Body:

```json
{
  "title": "Best Laptop",
  "content": "Great for coding"
}
```

---

### 🔍 Search Documents

```
GET /search?q=laptop
```

#### Response:

```json
[
  {
    "id": "123",
    "score": 1.23,
    "data": {
      "title": "Best Laptop",
      "content": "Great for coding"
    }
  }
]
```

---

## 🧠 Key Concepts Implemented

* Inverted indexing (Elasticsearch)
* Full-text search
* Relevance scoring
* Dual database architecture
* Data transformation between systems

---

## ⚠️ Challenges & Solutions

### ❌ MongoDB ObjectId Issue

* Elasticsearch cannot serialize ObjectId
* ✅ Solution: Transform document before indexing

### ❌ Elasticsearch Version Mismatch

* Client v9 incompatible with ES v8
* ✅ Solution: Use `elasticsearch==8.11.1`

---

## 🚀 Future Improvements

* 🔥 Auto-suggestions (prefix search)
* 🔥 Highlight matched text
* 🔥 Pagination
* 🔥 Caching with Redis
* 🔥 Ranking optimization (TF-IDF tuning)

---

## 💡 Interview Explanation (Short)

> Built a search engine system using FastAPI, MongoDB, and Elasticsearch. MongoDB is used as the primary datastore while Elasticsearch handles full-text search and ranking. Implemented a write pipeline for indexing and a read pipeline for efficient search queries.

---

## 👨‍💻 Author

**Your Name**

---

<!-- ## ⭐ Star this repo if you like it! -->
