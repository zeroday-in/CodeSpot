from django.contrib import admin
from django.urls import path, include, re_path
import os
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('', include('posts.urls')),
]
