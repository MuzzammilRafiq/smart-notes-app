from pydantic import BaseModel
from typing import List


class GetEmbeddingsRequest(BaseModel):
    collection_name: str = "all_collections"


class AddEmbeddingsRequest(BaseModel):
    texts: List[str]
    noteIds: List[str]


class GetSimilarEmbeddingsRequest(BaseModel):
    text: str
    n_results: int = 1


class EmbeddingRequest(BaseModel):
    texts: List[str]


class QueryRequest(BaseModel):
    query: str

    n_results: int = 5


class CentroidRequest(BaseModel):
    texts: List[List[str]]
    labels: List[str]


class GetGroupForText(BaseModel):
    texts: List[str]
    n_results: int = 1


class GG(BaseModel):
    data: str
