import os
import chromadb
from dotenv import load_dotenv

load_dotenv(".env.local")
db_url = os.getenv("DB_URL")


class ChromaDBConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ChromaDBConnection, cls).__new__(cls)
            cls._instance._client = None
        return cls._instance

    def get_connection(self):
        if self._client is None:
            self._client = chromadb.PersistentClient(path=db_url or "./db")
            print("Connection to ChromaDB established.")
        else:
            print("Using existing connection to ChromaDB.")
        return self._client


connect = ChromaDBConnection()
chroma_client = connect.get_connection()

if __name__ == "__main__":
    connect = ChromaDBConnection()
    client = connect.get_connection()
    print(client)
