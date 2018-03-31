from bs4 import BeautifulSoup
import requests
import re
import urllib.request
import json
import numpy as np

data = json.load(open('test.json'))
# def dataToJson(data):
#     data[1]["image_url"] = "http://apple.com" 
#     print(data)
#     json.dump(data, open("try_test.json", "w"), indent=4)
#     return data
#     # return 
# print(dataToJson(data))

for i in range(len(data)):
    for b in range(1,3):
        if "image_url1" not in data[i]:
        # del data[i]["original_title"]

            def get_soup(url,header):
                return BeautifulSoup(urllib.request.urlopen(urllib.request.Request(url,headers=header)),'html.parser')

            
            query = data[i]["title"]+" movie poster"
            print(query)
            image_type="ActiOn"
            query= query.split()
            query='+'.join(query)
            url="https://www.google.co.in/search?q="+query+"&source=lnms&tbm=isch"
            # print(url)
            #add the directory for your image here
            DIR="Pictures"
            header={'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
            }
            soup = get_soup(url,header)
            # ActualImages=[]
            a = soup.find_all("div",{"class":"rg_meta"})[b]
            link =json.loads(a.text)["ou"]
            # ActualImages.append(link)

            print(link)
            data[i]["image_url"+str(b)] = link
            json.dump(data, open("test.json", "w"), indent=4)


        