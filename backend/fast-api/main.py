# # from fastapi import FastAPI
# # import uvicorn

# # app = FastAPI()


# # @app.get("/")
# # def read_root():
# #     return {"Hello": "World"}


# # @app.get("/items/{item_id}")
# # def read_item(item_id: int, q: str = None):
# #     return {"item_id": item_id, "q": q}


# # if __name__ == "__main__":

# #     uvicorn.run(app, host="0.0.0.0", port=8000)


# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import chromadb
# from chromadb.config import Settings
# from chromadb import QueryResult
# from sentence_transformers import SentenceTransformer
# import uvicorn
# import numpy as np


# # Initialize ChromaDB client
# chroma_client = chromadb.PersistentClient(path="./chroma_storage")

# # Initialize embedding model
# embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# # Create FastAPI application
# app = FastAPI(
#     title="ChromaDB Embedding Service",
#     description="API for managing and querying text embeddings",
#     version="1.0.0",
# )


# # Pydantic models for request validation
# class EmbeddingRequest(BaseModel):
#     texts: list[str]
#     collection_name: str = "default_collection"


# class QueryRequest(BaseModel):
#     query: str
#     collection_name: str = "default_collection"
#     n_results: int = 5


# # Utility function to generate embeddings
# def generate_embeddings(texts) -> list[np.ndarray]:
#     return embedding_model.encode(texts).tolist()


# @app.post("/create-collection")
# async def create_collection(collection_name: str):
#     """
#     Create a new embedding collection
#     """
#     try:
#         collection = chroma_client.create_collection(name=collection_name)
#         return {"status": "Collection created successfully", "name": collection_name}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))


# @app.post("/add-embeddings")
# async def add_embeddings(request: EmbeddingRequest):
#     """
#     Add text embeddings to a specified collection
#     """
#     try:
#         # Get or create collection
#         collection = chroma_client.get_or_create_collection(
#             name=request.collection_name
#         )

#         # Generate embeddings
#         embeddings = generate_embeddings(request.texts)

#         # Create unique IDs
#         ids = [f"id_{hash(text)}" for text in request.texts]

#         # Add to collection
#         collection.add(embeddings=embeddings, documents=request.texts, ids=ids)

#         return {
#             "status": "Embeddings added successfully",
#             "count": len(request.texts),
#             "collection": request.collection_name,
#         }
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))


# @app.post("/query")
# async def query_embeddings(request: QueryRequest):
#     """
#     Query similar embeddings from a collection
#     """
#     try:
#         # Get collection
#         collection = chroma_client.get_collection(name=request.collection_name)

#         # Generate query embedding
#         query_embedding = generate_embeddings([request.query])

#         # Perform query
#         results: QueryResult = collection.query(
#             query_embeddings=query_embedding, n_results=request.n_results
#         )

#         return {
#             "query": request.query,
#             "results": {
#                 "documents": results["documents"][0],
#                 "distances": results["distances"][0],
#                 "ids": results["ids"][0],
#             },
#         }
#     except Exception as e:
#         print(e)
#         raise HTTPException(status_code=400, detail=str(e))


# # Main entry point for running the server
# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, access_log=True)
