import uvicorn
from fastapi import FastAPI

# local imports
from routers import embeddings_router


app = FastAPI()

app.include_router(embeddings_router, prefix="/embeddings")

if __name__ == "__main__":
    uvicorn.run("run:app", host="localhost", port=8000, reload=True)
