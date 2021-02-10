import requests
import json

r = requests.get('https://gh-pinned-repos.now.sh/?username=Dev-Mehta')
response = r.json()
for i in response:
	print(i)