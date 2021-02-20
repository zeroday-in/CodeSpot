from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, User
from hashlib import sha256
from io import BytesIO
from PIL import Image
from django.core.files import File
import requests
from threading import Thread

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
	gitlab_url = models.URLField(blank=True)
	behance_url = models.URLField(blank=True)
	instagram_url = models.URLField(blank=True)
	github_url = models.URLField(blank=True)
	def __str__(self):
		return str(self.user.username)

	def save(self, *args, **kwargs):
		t = Thread(target=GithubTask(self.user))
		t.start()
		super().save(*args, **kwargs)

class GitHubRepo(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=255)
	description = models.TextField(blank=True)
	top_language = models.CharField(max_length=255,blank=True)
	stars = models.IntegerField(blank=True)
	fork = models.BooleanField(default=False)
	url = models.URLField(blank=True)
	def __str__(self) -> str:
		return str(self.name)

class GitHubProfile(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	repos = models.ManyToManyField(GitHubRepo)

	def __str__(self) -> str:
		return str(self.user)


def GithubTask(user):
	r = requests.get(f'https://gh-pinned-repos-5l2i19um3.vercel.app/?username={user}')
	response = r.json()
	gh = GitHubProfile.objects.filter(user=user)
	if not gh.exists():
		for i in response:
			name = i['repo']
			description = i['description']
			try:
				language = i['language']
			except KeyError:
				language = ''
			stars = i['stars']
			url = i['link']
			gh_repo = GitHubRepo(user=user,
				name=name,
				description=description,
				top_language=language,
				stars=stars,
				fork=False,
				url=url
			)
			gh_repo.save()
		gh_profile = GitHubProfile(user=user)
		gh_profile.save()
		gh_repos = GitHubRepo.objects.filter(user=user)
		for i in gh_repos:
			gh_profile.repos.add(i)
			gh_profile.save()

		for i in gh_repos:
			req = requests.get(f'https://api.github.com/repos/{i.user.username}/{i.name}')
			res = req.json()
			if res['fork'] == True:
				i.fork = True
				i.save()