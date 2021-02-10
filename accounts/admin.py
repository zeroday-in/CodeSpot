from django.contrib import admin
from .models import GitHubProfile, GitHubRepo, Profile
# Register your models here.
admin.site.register(Profile)
admin.site.register(GitHubProfile)
admin.site.register(GitHubRepo)