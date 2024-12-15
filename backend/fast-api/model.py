from sentence_transformers import SentenceTransformer
import numpy as np


class EmbeddingsModel:
    def __init__(self, model_name: str = "all-miniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)

    def generate_embeddings(self, texts) -> list[np.ndarray]:
        return self.model.encode(texts).tolist()

    def get_centroid(self, embeddings):
        return np.mean(embeddings, axis=0)

    def get_similarity(self, embedding1, embedding2):
        return np.dot(embedding1, embedding2) / (
            np.linalg.norm(embedding1) * np.linalg.norm(embedding2)
        )
