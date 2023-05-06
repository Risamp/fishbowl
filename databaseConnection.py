from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

class DatabaseConnection(object):

    def __init__(self) -> None:
        load_dotenv()
        self.uri = os.getenv('DATABASE_CONNECTION')
        self.client = None

    def __enter__(self):
        return self.get_client()
    
    def __exit__(self, *exc):
        self.client.close()
    
    def get_client(self):
        if not self.client:
            try:
                self.client = MongoClient(self.uri, server_api=ServerApi('1'))
            except:
                print("other error")
        return self.client

    def close(self):
        if self.client:
            self.client.close()
        

    
