from django.db import models
from django.contrib.auth.models import User
from hashlib import sha256
class Profile(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	profile_picture = models.ImageField(upload_to='static/images/profile_picture')
	bio = models.TextField()
	website = models.URLField(blank=True)
	follows = models.ManyToManyField('Profile',related_name='followed_by')


	def add_follower(self,user):
		u = Profile.objects.get(user=User.objects.get(username=user))
		self.follows.add(u)

	def remove_follower(self,user):
		u = Profile.objects.get(user=User.objects.get(username=user))
		self.follows.remove(u)

	def __str__(self):
		return str(self.user.username)