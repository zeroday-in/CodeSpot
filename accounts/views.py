from accounts.forms import ProfileForm
from django.http import request
from django.http.response import HttpResponse
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView
from accounts.models import Profile
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.views.generic import View


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form, 'user_count': User.objects.all().count()})


class HomePage(View):
	def get(self, request, *args, **kwargs):
		p = Profile.objects.filter(
		    user=User.objects.get(username=request.user.username))
		if not p.exists():
			return redirect('create_profile', username=request.user.username)
		return render(request, "homepage.html")


class CreateProfile(CreateView):
	model = Profile
	fields = ['name', 'email', 'bio', 'location', 'profile_picture', 'website']

	def get(self, request, *args, **kwargs):
		if request.user.username != self.kwargs['username']:
			return redirect('home')
		
		else:
			return super().get(request, *args, **kwargs)

	def form_valid(self, form):
		name = self.request.POST.get('name')
		email = self.request.POST.get('email')
		bio = self.request.POST.get('bio')
		location = self.request.POST.get('location')
		profile_picture = self.request.FILES['profile_picture']
		website = self.request.POST.get('website')
		user = User.objects.get(username=self.request.user.username)
		p = Profile(name=name, email=email, bio=bio, location=location,
		user=user,profile_picture=profile_picture,website=website)
		p.save()
		print(p)
		return redirect("detail_profile", username=user.username)

class UpdateProfile(View):
	def get(self, request, *args, **kwargs):
		if request.user.username != self.kwargs['username']:
			return redirect('home')
		else:
			form = ProfileForm()
			profile = Profile.objects.get(user=User.objects.get(username=self.request.user))
			return render(request, "accounts/update_profile_form.html", {"form":form, "profile":profile})

	def post(self, request, *args, **kwargs):
		form = ProfileForm(self.request.POST, self.request.FILES)
		if form.is_valid():
			name = self.request.POST.get('name')
			email = self.request.POST.get('email')
			bio = self.request.POST.get('bio')
			location = self.request.POST.get('location')
			profile_picture = self.request.FILES['profile_picture']
			website = self.request.POST.get('website')
			user = User.objects.get(username=self.request.user.username)
			p = Profile.objects.get(user=User.objects.get(username=request.user))
			p.name = name
			p.email = email
			p.bio = bio
			p.location = location
			p.profile_picture = profile_picture
			p.website = website
			p.save()
			print(p)
			return redirect("detail_profile", username=user.username)
		else:
			profile = Profile.objects.get(user=User.objects.get(username=self.request.user))
			return render(request, "accounts/update_profile_form.html", {"form":form, "profile":profile})

class DetailProfile(View):
	def get(self, request, *args, **kwargs):
		u = User.objects.filter(username=self.kwargs['username'])
		if u.exists():
			u = u[0]
			p = Profile.objects.get(user=u)
			return render(request, "accounts/profile_detail.html", {"profile":p})