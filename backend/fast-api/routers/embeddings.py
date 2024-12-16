import uuid
from chromadb import Metadata
from fastapi import APIRouter, HTTPException, Request  # Add Request import
from typing import TypeVar, Union, List
import time

# local imports
from connection import ChromaDBConnection
from pydantic_models import (
    AddEmbeddingsRequest,
    GetSimilarEmbeddingsRequest,
    CentroidRequest,
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
        assert len(request.userIds) == len(request.texts)
        embeddings = model.generate_embeddings(request.texts)
        collection = chroma_client.get_or_create_collection(name="all_collections")
        ids = [str(uuid.uuid4()) for _ in range(len(request.texts))]
        metadata: OneOrMany[Metadata] = [
            {"userId": str(userId), "timestamp": float(time.time())}
            for userId in request.userIds
        ]
        # print("texts", request.texts)
        # print("userIds", request.userIds)
        # print("embeddings", len(embeddings), len(embeddings[0]))
        # print("ids", ids)

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


@router.post("/get-similar")  # Change to POST method
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
