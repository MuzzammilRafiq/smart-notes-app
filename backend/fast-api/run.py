import uvicorn
from fastapi import FastAPI

# local imports
from Model import EmbeddingsModel
from connection import ChromaDBConnection
from routers import embeddings_router  # Import the embeddings router


app = FastAPI()

app.include_router(embeddings_router, prefix="/embeddings")  # Include the router

if __name__ == "__main__":
    uvicorn.run("run:app", host="localhost", port=8000, reload=True)
