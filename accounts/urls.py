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
    path('<slug:username>/create-profile/', login_required(views.CreateProfile.as_view()), name='create_profile'),
	path('<slug:username>/', login_required(views.DetailProfile.as_view()), name='detail_profile'),
	path('<slug:username>/edit-profile/',login_required(views.UpdateProfile.as_view()), name='update_profile')
]
