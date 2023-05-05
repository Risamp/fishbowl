from flask import Flask, send_from_directory
from databaseConnection import DatabaseConnection
import pymongo

app = Flask(__name__, static_url_path='', static_folder='frontend/dist')

db = DatabaseConnection()



@app.route('/',defaults={"path":""})
def serve(path):
    return send_from_directory(app.static_folder,'newTab.html')