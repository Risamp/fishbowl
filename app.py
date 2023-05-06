from flask import Flask, send_from_directory, g
from flask_cors import CORS, cross_origin
from databaseConnection import DatabaseConnection
import pymongo
import random

app = Flask(__name__, static_url_path='', static_folder='frontend/dist')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def get_db():
    if not hasattr(g, 'mongo_db'):
        g.mongo_db = DatabaseConnection()
    return g.mongo_db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'mongo_db'):
        g.mongo_db.close()

@app.route('/',defaults={"path":""})
@cross_origin()
def serve(path):
    return send_from_directory(app.static_folder,'newTab.html')

@app.route('/fish')
@cross_origin()
def get_fish_info():
    db = get_db().get_client()
    with db:
        num_fish = db.fishbowl.fish.count_documents({})
        selection = random.randint(1,num_fish)
        fishInfo = db.fishbowl.fish.find_one({"_id" : selection})
    return fishInfo
    



