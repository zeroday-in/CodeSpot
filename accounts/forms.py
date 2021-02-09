from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.fields['profile_picture'].required = False
	class Meta:
		model = Profile
		fields = ['name', 'email', 'bio', 'location', 'profile_picture', 'website',
		'gitlab_url','behance_url','instagram_url','github_url']