import requests
import json

r = requests.get('https://api.github.com/repos/Dev-Mehta/first-contributions')
response = r.json()
for i in response:
	print(response)