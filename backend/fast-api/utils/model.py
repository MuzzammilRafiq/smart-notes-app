from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List


class EmbeddingsModel:
    def __init__(self, model_name: str = "all-miniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)

    def generate_embeddings(self, texts: List[str]) -> list[np.ndarray]:
        return self.model.encode(texts).tolist()

    def get_centroid(self, embeddings: List[List[float]]):
        embeddings = np.array(embeddings)
        return np.mean(embeddings, axis=0).tolist()

    def get_similarity(
        self, embedding1: List[List[float]], embedding2: List[List[float]]
    ):
        return (
            np.dot(embedding1, embedding2)
            / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2)).tolist()
        )


model = EmbeddingsModel("all-mpnet-base-v2")
