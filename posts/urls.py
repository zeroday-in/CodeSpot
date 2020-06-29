from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
urlpatterns = [
    path('posts/new/', login_required(views.writePost), name='new-post'),
    path('trending/',login_required(views.postList), name='post-list'),
    path('<slug:user>/posts/<slug:post>/',login_required(views.postDetail), name='post-detail'),
    path('like/',login_required(views.likePost), name='like_post'),
    path('<slug:user>/posts/',login_required(views.userPost), name='users-posts')
]
