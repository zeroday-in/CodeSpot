from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, User
from hashlib import sha256
from io import BytesIO
from PIL import Image
from django.core.files import File

def compress(image):
    im = Image.open(image)
    if im.mode in ("RGBA","P"):
    	im = im.convert("RGB")
    im_io = BytesIO() 
    im = im.resize((150,150))
    im.save(im_io, 'JPEG', quality=60) 
    new_image = File(im_io, name=image.name)
    return new_image

class Profile(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=80)
	email = models.EmailField()
	location = models.CharField(max_length=255)
	profile_picture = models.ImageField(upload_to='media/images/profile_picture', max_length=500)
	bio = models.TextField()
	website = models.URLField(blank=True)
	followers = models.ManyToManyField('Profile',related_name='followed_by')
	following = models.ManyToManyField('Profile')
	def __str__(self):
		return str(self.user.username)

	def save(self, *args, **kwargs):
		super().save(*args, **kwargs)
		
