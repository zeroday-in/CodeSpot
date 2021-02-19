import requests
import json

headers = {
	"Host":"dev.to",
	"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0",
	"Accept":"application/json",
	"Accept-Language":"en-US,en;q=0.5",
	"Accept-Encoding":"gzip, deflate, br",
	"Content-Type":"application/json",
	"Content-Length":"30",
	"Origin":"https://dev.to",
	"Referer":"https://dev.to/new",
	"Connection":"keep-alive",
	"Pragma":"no-cache",
	"Cache-Control":"no-cache",
	"TE":"Trailers"
}
data = {
	"article_body":"Hello World"
}
r = requests.post('https://dev.to/articles/preview', headers=headers, data=data)
print(r.json())