from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('new/', login_required(views.PostCreate.as_view())),
	path('post/preview', login_required(views.PostPreview.as_view())),
	path('<slug:username>/<slug:post_url>', login_required(views.PostDetail.as_view()), name='post-detail'),
	path('like/', login_required(views.LikePost.as_view())),
]