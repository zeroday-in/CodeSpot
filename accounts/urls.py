from django.urls import path, include
from . import views
from django.contrib.auth.decorators import login_required
urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('register/', views.register, name='register'),
    path('', views.landing_page, name='home'),
    path('edit_profile/', login_required(views.edit_profile), name='edit_profile'),
    path('follow/<slug:user>', login_required(views.followUser), name='follow'),
    path('unfollow/<slug:user>', login_required(views.unfollowUser), name='follow'),
    path('<slug:user>', login_required(views.userProfile), name='profile')
]
