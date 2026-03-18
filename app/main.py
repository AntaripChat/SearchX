from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import document_routes, search_routes
from services.elastic_service import create_index

app = FastAPI()

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    create_index()


app.include_router(document_routes.router)
app.include_router(search_routes.router)