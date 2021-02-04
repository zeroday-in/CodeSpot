from django.urls import path, include
from . import views
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from django.contrib.auth.models import User

urlpatterns = [
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),
    path('', login_required(views.landing_page), name='home'),
    path('edit_profile/', login_required(views.edit_profile), name='edit_profile'),
    path('follow/<slug:user>', login_required(views.followUser), name='follow'),
    path('unfollow/<slug:user>', login_required(views.unfollowUser), name='follow'),
    path('<slug:user>', login_required(views.userProfile), name='profile'),
    path('login/', auth_views.LoginView.as_view(
        extra_context={'user_count':User.objects.all().count()}
    ), name='login'),
    path('new/', views.createPost),
]
