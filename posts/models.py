from django.db import models
from django.contrib.auth.models import User
from accounts.models import Profile
import readtime

class Post(models.Model):
	author= models.ForeignKey(User, on_delete=models.CASCADE)
	title= models.CharField(max_length=300)
	url= models.SlugField(max_length=300)
	content= models.TextField()
	created_on = models.DateTimeField(auto_now_add= True)
	likes= models.IntegerField(default=0)
    
	def __str__(self):
		return self.title

	def get_readtime(self):
		result = readtime.of_html(self.content)
		return result.text

	def get_profile(self):
		result = Profile.objects.get(user=self.author)
		return result

class Liker(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    post= models.ForeignKey(Post, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)