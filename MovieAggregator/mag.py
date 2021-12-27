from requests import get
from bs4 import BeautifulSoup
import requests
from datetime import datetime

urls = ['https://www.imdb.com/list/ls063771441/?sort=list_order,asc&st_dt=&mode=detail&page=1', 'https://www.imdb.com/list/ls063771441/?sort=list_order,asc&st_dt=&mode=detail&page=2']

API_URL = 'http://localhost:5001/movie/add'

for item in urls:
    response = get(item)
    html_soup = BeautifulSoup(response.text, 'html.parser')
    movie_containers = html_soup.find_all('div', class_ = 'lister-item mode-detail')
    for i in range(0, 100):
        try:
            currentMovie = movie_containers[i]
            date = currentMovie.find('span', attrs = {'class':'lister-item-year text-muted unbold'})
            rating = currentMovie.find('span', attrs = {'class':'ipl-rating-star__rating'})
            gross_vote = currentMovie.find('span', attrs = {'name':'nv'}).next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling

            dt = '01/01/' + date.text.replace('(', '').replace(')','')
            dt2 = datetime.strptime(dt, '%d/%M/%Y')

            movie = {
                "name": currentMovie.h3.a.text,
                "gross" : gross_vote.text.replace('$','').replace('M', ''),
                "ratings" : float(rating.text),
                "date" : dt
            }

            r = requests.post(API_URL, json=movie)
            print(r.text)
            
        except Exception as e:
            print(e)

