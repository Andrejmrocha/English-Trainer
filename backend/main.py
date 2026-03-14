from fastapi import FastAPI
from database import init_db

app = FastAPI(title="English Trainer")

init_db()

@app.get("/health")
def health():
    return {"status": "ok"} 