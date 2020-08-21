from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from .forms import ProfileForm
from django.contrib.auth.models import User
from .models import Profile
from django.http import HttpResponse
from posts.models import Post
from PIL import Image
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from base64 import b64decode
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('edit_profile')
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

def landing_page(request):
	return render(request, "homepage.html")

def edit_profile(request):
	if request.method == 'POST':
		form = ProfileForm(request.POST, request.FILES)
		if form.is_valid():
			try:
				p = Profile.objects.get(user=request.user)
				url = request.POST.get('pp_url')
				url = url.split('base64,')
				url = url[1]
				url_decoded = b64decode(url)
				content = ContentFile(url_decoded)
				profile_picture = form.cleaned_data.get('profile_picture')
				if profile_picture == None:
					profile_picture = request.POST.get("profile_picture_old")
				else:
					profile_picture = ContentFile(url_decoded)
				bio = form.cleaned_data.get('bio')
				website = form.cleaned_data.get('website')
				p.profile_picture = default_storage.save(f'{request.user}.jpg',content)
				p.bio=bio
				p.website=website
				p.save()
			except Profile.DoesNotExist:	
				user = User.objects.get(username=request.user)
				profile_picture = form.cleaned_data.get('profile_picture')
				bio = form.cleaned_data.get('bio')
				website = form.cleaned_data.get('website')
				p = Profile(
					user=user,
					profile_picture=profile_picture,
					bio=bio,
					website=website
				)
				p.save()
			return redirect(f'/{request.user}')
		else:
			return render(request, "edit_profile.html", {"form":form})
	else:
		form = ProfileForm()
		try:
			p = Profile.objects.get(user=User.objects.get(username=request.user))
			return render(request, "edit_profile.html", {"form":form,"p":p})
		except Profile.DoesNotExist:
			return render(request, "edit_profile.html", {"form":form})

def followUser(request, user):
	userProfile = Profile.objects.get(user=User.objects.get(username=user))
	ruser = Profile.objects.get(user=User.objects.get(username=request.user))
	ruser.following.add(userProfile)
	ruser.save()
	userProfile.followers.add(ruser)
	userProfile.save()
	return HttpResponse(ruser.following.all())

def unfollowUser(request, user):
	userProfile = Profile.objects.get(user=User.objects.get(username=user))
	ruser = Profile.objects.get(user=User.objects.get(username=request.user))
	ruser.following.remove(userProfile)
	ruser.save()
	userProfile.followers.remove(ruser)
	userProfile.save()
	return HttpResponse(ruser.following.all())

def userProfile(request, user):
	user = Profile.objects.get(user=User.objects.get(username=user))
	posts = Post.objects.filter(author=User.objects.get(username=user)).order_by('-likes')[:3]
	ruser = Profile.objects.get(user=User.objects.get(username=request.user))
	if user == ruser:
		sameUser = True
	else:
		sameUser = False

	if user in ruser.following.all():
		print("Following")
		canFollow = False
		following = "true"
		text = "Unfollow"
	else:
		print("Not following")
		canFollow = True
		following = "false"
		text = "Follow"
	if user in ruser.followers.all() and user not in ruser.following.all():
		canFollow = True
		following = "false"
		text = "Follow Back"
	print(canFollow)
	return render(request,
	 "user_profile.html",
	 {"user":user,
	 "posts":posts,
	 "canFollow":canFollow,
	 "sameUser":sameUser,
	 "following":following,
	 "text":text})