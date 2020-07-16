from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):
	profile_picture = forms.ImageField(required=False)
	class Meta:
		model = Profile
		exclude = ['user', 'profile_picture', 'follows']