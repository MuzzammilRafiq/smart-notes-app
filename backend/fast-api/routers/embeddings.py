import uuid
from chromadb import Metadata
from fastapi import APIRouter, HTTPException, Request
from typing import TypeVar, Union, List
import time
from fastapi import Query
from urllib.parse import unquote
from pprint import pprint

# local imports
from connection import ChromaDBConnection
from pydantic_models import (
    AddEmbeddingsRequest,
    GetSimilarEmbeddingsRequest,
    CentroidRequest,
    GetGroupForText,
)
from utils.utils import generate_centriods
from utils.model import model

router = APIRouter()
chroma_client = ChromaDBConnection().get_connection()
T = TypeVar("T")
OneOrMany = Union[T, List[T]]


@router.get("/all")
def get_all_embeddings():
    try:
        collection = chroma_client.get_or_create_collection(name="all_collections")
        results = collection.get()
        return results
    except Exception as e:
        print(e)
        return {"error": "internal server error"}


@router.post("/add")
def add_embeddings(request: AddEmbeddingsRequest):
    try:
        assert len(request.noteIds) == len(request.texts)
        embeddings = model.generate_embeddings(request.texts)
        collection = chroma_client.get_or_create_collection(name="all_collections")
        ids = [str(uuid.uuid4()) for _ in range(len(request.texts))]
        metadata: OneOrMany[Metadata] = [
            {"userId": str(userId), "timestamp": float(time.time())}
            for userId in request.noteIds
        ]

        collection.add(
            embeddings=embeddings, documents=request.texts, metadatas=metadata, ids=ids
        )

        return {
            "ids": ids,
        }
    except Exception as e:
        print("error-->", e)
        return {"error": str(e)}


@router.get("/get-similar")  # Change to POST method
def get_similar_embeddings(query: str, n_results: int = Query(default=1)):
    try:
        collection = chroma_client.get_or_create_collection(name="all_collections")
        embeddings = model.generate_embeddings([query])
        r = collection.query(
            query_embeddings=embeddings[0],
            n_results=n_results,
        )
        return r
    except Exception as e:
        raise HTTPException(
            status_code=500, detail="internal server error"
        )  # Raise HTTPException


@router.get("/get-similar-embeddings-by-id")
def get_similar_embeddings_by_id(request: Request):
    try:
        userId = request.query_params["userId"]
        collection = chroma_client.get_or_create_collection(name="all_collections")
        r = collection.query_by_id(id=userId)
        return r
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="internal server error")


@router.post("/create-centroids")
def create_centroids(request: CentroidRequest):
    try:
        # print(request.texts)
        print("____________")
        print(request.labels)
        assert len(request.texts) == len(request.labels)
        centroids = generate_centriods(request.texts)
        collection = chroma_client.get_or_create_collection(name="centroids")
        ids = [str(uuid.uuid4()) for _ in range(len(request.texts))]
        metadata: OneOrMany[Metadata] = [
            {"label": str(label), "timestamp": float(time.time())}
            for label in request.labels
        ]
        response = collection.add(
            embeddings=centroids, documents=request.labels, metadatas=metadata, ids=ids
        )

        return {
            "status": "Centroids added successfully",
        }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="internal server error")


@router.get("/get-all-centroids")
def get_all_centroids():
    try:
        collection = chroma_client.get_or_create_collection(name="centroids")
        results = collection.get()
        return results
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="internal server error")


@router.get("/get-group")
def get_group_of_texts(request: GetGroupForText):
    try:
        texts = request.texts
        embeds = model.generate_embeddings(texts)
        n_results = int(request.n_results)
        collection = chroma_client.get_or_create_collection(name="centroids")
        r = collection.query(
            query_embeddings=embeds,
            n_results=n_results,
        )
        return r
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="internal server error")


@router.delete("/delete/{embedding_id}")
def delete_embedding(embedding_id: str):
    try:
        collection = chroma_client.get_or_create_collection(name="all_collections")
        collection.delete(ids=[embedding_id])
        return {"status": "Embedding deleted successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="internal server error")
