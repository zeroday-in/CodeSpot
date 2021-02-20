import secrets
from django.contrib.auth.models import User
from django.http.response import HttpResponse
from django.template.defaultfilters import slugify
from django.views.generic import CreateView, View
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect, render
from django.http import JsonResponse
import markdown
from .models import Liker, Post
from secrets import token_hex
class PostCreate(View):
	def get(self, request, *args, **kwargs):
		return render(request, "posts/post_create.html")

	def post(self, request, *args, **kwargs):
		title = self.request.POST.get('article-form-title')
		body = self.request.POST.get('article-body-markdown')
		html = markdown.markdown(str(body), extensions=['fenced_code','codehilite'])
		author = User.objects.get(username=self.request.user.username)
		url = str(slugify(title)) + "-" +  str(token_hex(2))
		p = Post(title=title, content=html, author=author, url=url)
		p.save()
		return redirect(f'/{author}/{url}')

class PostPreview(View):
	@csrf_exempt
	def dispatch(self, request, *args, **kwargs):
		return super().dispatch(request, *args, **kwargs)

	def post(self,request,*args,**kwargs):
		md = request.POST.get('body')
		title = request.POST.get('title')
		html = markdown.markdown(str(md), extensions=['fenced_code','codehilite'])
		html = str(html)
		return JsonResponse({"html":html,"title":title})
	
class PostDetail(View):
	def get(self, request, *args, **kwargs):
		user = User.objects.get(username=kwargs['username'])
		r_user = User.objects.get(username=self.request.user)
		post = Post.objects.get(author=user, url=kwargs['post_url'])
		context = {
			"post": post,
			"profile":post.get_profile()
		}
		liked = Liker.objects.filter(user=r_user, post=post)
		if liked.exists():
			liked = liked[0]
			context['liked'] = liked.liked
		return render(request, "posts/post_detail.html", context)

class LikePost(View):
	@csrf_exempt
	def dispatch(self, request, *args, **kwargs):
		return super().dispatch(request, *args, **kwargs)
	
	def post(self, request, *args, **kwargs):
		username = self.request.POST.get('user')
		post_id = self.request.POST.get('post')
		user = User.objects.get(username=username)
		post = Post.objects.get(id=post_id)	
		liker, created = Liker.objects.get_or_create(user=user,post=post)
		response_ = ""
		if created:
			response_ = "Liked"
		else:
			if liker.liked:
				liker.liked = False
				response_ = "Disliked"
				post.likes -= 1;
			else:
				liker.liked = True
				response_ = "Liked"
				post.likes += 1;
		post.save()
		liker.save()
		print(response_)
		return HttpResponse(response_)