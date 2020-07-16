from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('register/', views.register, name='register'),
    path('', views.landing_page, name='home'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('follow/<slug:user>', views.followUser, name='follow'),
    path('unfollow/<slug:user>', views.unfollowUser, name='follow'),
    path('<slug:user>', views.userProfile, name='profile')
]
