from databaseConnection import DatabaseConnection

def uploadNewFish():
    with DatabaseConnection() as db:
        try: 
            #change data for new fish
            data = {"query" : "10269/135087846", "scientific_name" : "Huso huso"}
            db.fishbowl.fish.insert_one(data)
            db.close()
        except:
            print("error")
            db.close()