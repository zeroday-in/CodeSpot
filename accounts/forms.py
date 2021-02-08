from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):
	class Meta:
		model = Profile
		fields = ['name', 'email', 'bio', 'location', 'profile_picture', 'website']