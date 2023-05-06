from databaseConnection import DatabaseConnection
import json

def uploadNewFish():
    with DatabaseConnection() as db:
        try: 
            fish = {}
            next = db.fishbowl.fish.count_documents({}) + 1
            fish["_id"] = next
            db.fishbowl.fish.insert_one(fish)
            db.close()
        except:
            print("error")
            db.close()

uploadNewFish()