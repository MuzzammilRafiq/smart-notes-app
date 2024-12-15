import time
from typing import List, TypeVar, Union
from chromadb import Metadata
import uvicorn
import uuid
from fastapi import FastAPI

# local imports
from pydantic_models import AddEmbeddingsRequest, GetSimilarEmbeddingsRequest
from Model import EmbeddingsModel
from connection import ChromaDBConnection


app = FastAPI()
model = EmbeddingsModel("all-mpnet-base-v2")
chroma_client = ChromaDBConnection().get_connection()
T = TypeVar("T")
OneOrMany = Union[T, List[T]]


@app.get("/")
def get_all_embeddings():
    try:
        collection = chroma_client.get_or_create_collection(name="all_collections")
        results = collection.get()
        return results
    except Exception as e:
        print(e)
        return {"error": "internal server error"}


@app.post("/add-embeddings")
def add_embeddings(request: AddEmbeddingsRequest):
    try:
        assert len(request.userIds) == len(request.texts)
        embeddings = model.generate_embeddings(request.texts)
        collection = chroma_client.get_or_create_collection(name="all_collections")
        ids = [str(uuid.uuid4()) for _ in range(len(request.texts))]
        metadata: OneOrMany[Metadata] = [
            {"userId": str(userId), "timestamp": float(time.time())}
            for userId in request.userIds
        ]
        print("texts", request.texts)
        print("userIds", request.userIds)
        print("embeddings", len(embeddings), len(embeddings[0]))
        print("ids", ids)

        response = collection.add(
            embeddings=embeddings, documents=request.texts, metadatas=metadata, ids=ids
        )
        print("response", response)

        return {
            "status": "Embeddings added successfully",
        }
    except Exception as e:
        print("error-->", e)
        return {"error": str(e)}


@app.get("/get-similar-embeddings")
def get_similar_embeddings(request: GetSimilarEmbeddingsRequest):
    try:
        collection = chroma_client.get_or_create_collection(name="all_collections")
        embeddings = model.generate_embeddings([request.text])
        r = collection.query(
            query_embeddings=embeddings[0],
            n_results=request.n_results,
        )
        return r
    except Exception as e:
        print(e)
        return {"error": "internal server error"}


if __name__ == "__main__":
    uvicorn.run("run:app", host="localhost", port=8000, reload=True)
