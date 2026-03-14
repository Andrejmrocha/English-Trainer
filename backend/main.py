from fastapi import FastAPI

app = FastAPI(title="English Trainer")

@app.get("/health")
def health():
    return {"status": "ok"} 