from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from .forms import ProfileForm
from django.contrib.auth.models import User
from .models import Profile
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('profile')
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
				profile_picture = form.cleaned_data.get('profile_picture')
				if profile_picture == None:
					profile_picture = request.POST.get("profile_picture_old")
				bio = form.cleaned_data.get('bio')
				website = form.cleaned_data.get('website')
				p.profile_picture=profile_picture
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
			return redirect('profile')
		else:
			return render(request, "edit_profile.html", {"form":form})
	else:
		form = ProfileForm()
		try:
			p = Profile.objects.get(user=User.objects.get(username=request.user))
			return render(request, "edit_profile.html", {"form":form,"p":p})
		except Profile.DoesNotExist:
			return render(request, "edit_profile.html", {"form":form})