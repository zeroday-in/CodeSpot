from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify

class Post(models.Model):
	author= models.ForeignKey(User, on_delete=models.CASCADE)
	title= models.CharField(max_length=300, unique=True)
	url= models.SlugField(max_length=300)
	content= models.TextField()
	created_on = models.DateTimeField(auto_now_add= True)
	likes= models.IntegerField(default=0)
    
	def __str__(self):
		return self.title


class Liker(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    post= models.ForeignKey(Post, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)