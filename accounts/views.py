from django.http.response import HttpResponse
from django.views.generic.edit import CreateView
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
    return render(request, 'registration/register.html', {'form': form, 'user_count':User.objects.all().count()})

class HomePage(View):
	def get(self, request, *args, **kwargs):
		p = Profile.objects.filter(user=User.objects.get(username=request.user.username))
		if not p.exists():
			return redirect('create-profile', username=request.user.username)
		return render(request, "homepage.html")

class CreateProfile(CreateView):
	model = Profile
	fields = ['name','email','bio','location','profile_picture','website']