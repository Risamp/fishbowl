import requests

database_string = "mongodb+srv://rpais:<password>@cluster0.4qnxw2i.mongodb.net/?retryWrites=true&w=majority"

url = "https://www.fishbase.se/summary/Chirostoma-humboldtianum.html"
page = requests.get(url)

print(page.text)
