from typing import List
from utils.model import model


def generate_centriods(tasks: List[List[str]]) -> List[List[float]]:
    embeds = []
    for task in tasks:
        embeds.append(model.generate_embeddings(task))
    centroids = []
    for embed in embeds:
        centroids.append(model.get_centroid(embed))
    return centroids
