from pydantic import BaseModel


class GetEmbeddingsRequest(BaseModel):
    collection_name: str = "all_collections"


class AddEmbeddingsRequest(BaseModel):
    texts: list[str]
    userIds: list[str]


class GetSimilarEmbeddingsRequest(BaseModel):
    text: str
    n_results: int = 1


class EmbeddingRequest(BaseModel):
    texts: list[str]


class QueryRequest(BaseModel):
    query: str

    n_results: int = 5


class CentroidRequest(BaseModel):
    texts: list[list[str]]
    labels: list[str]
