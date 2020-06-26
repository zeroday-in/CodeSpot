from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	profile_picture = models.ImageField(upload_to='static/images/profile_picture')
	bio = models.TextField()
	website = models.URLField(blank=True)
