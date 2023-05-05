from databaseConnection import DatabaseConnection
import math
import json

#Simple script for uploading sample data
#Input sample data into a json file
#Bit of a pain to delete duplicate data so please don't run unless you're sure of what you're inputting


with DatabaseConnection() as db:
    try: 
        #change from insert_one to insert_many for a list of data
        data = {"random" : math.rand(), "query" : "21858/170082633", "scientific_name" : "Thunnus maccoyii"}
        data = json(data)
        db.fishbowl.fish.insert_one(data)
        db.close()
    except:
        print("error")
        db.close()