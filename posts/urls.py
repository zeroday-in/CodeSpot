from django.urls import path
from . import views

urlpatterns = [
    path('posts/new/', views.writePost, name='new-post'),
    path('trending/', views.postList, name='post-list'),
    path('<slug:user>/posts/<slug:post>/', views.postDetail, name='post-detail'),
    path('like/', views.likePost, name='like_post'),
    path('<slug:user>/posts/', views.userPost, name='users-posts')
]