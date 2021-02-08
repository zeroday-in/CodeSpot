from django.urls import path, include
from . import views
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from django.contrib.auth.models import User

urlpatterns = [
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(
        extra_context={'user_count':User.objects.all().count()}
    ), name='login'),
    path('', login_required(views.HomePage.as_view()), name='home'),
    path('<str:username>/create-profile/', login_required(views.CreateProfile.as_view()), name='create-profile'),
]
