import requests
from bs4 import BeautifulSoup

database_string = "mongodb+srv://rpais:<password>@cluster0.4qnxw2i.mongodb.net/?retryWrites=true&w=majority"

url = "https://www.iucnredlist.org/species/"
page = requests.get(url)



def scrapeFishInfo(query):
    page = requests.get(url + query, headers={'User-Agent': 'Custom'})
    
    
    soup = BeautifulSoup(page.content, 'html5lib')
    print(soup.prettify())
    status_info = soup.find('article', attr={ "id" : "assessment-information"})

#test
scrapeFishInfo("10269/135087846")