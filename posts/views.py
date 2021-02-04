from django.shortcuts import render, redirect
from .forms import NewPostForm
from django.contrib.auth.models import User
from .models import Post, Liker
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.template.defaultfilters import slugify
from hashlib import sha256
def writePost(request):
	if request.method == 'POST':
		form = NewPostForm(request.POST)
		if form.is_valid():
			author = User.objects.get(username=request.user)
			title = form.cleaned_data.get('title')
			content = form.cleaned_data.get('content')
			slug = slugify(title)
			slug_hash = sha256(slug.encode('utf-8')).hexdigest()[:12]
			slug += f'-{slug_hash}'
			print(slug)
			p = Post(
				author=author,
				title=title,
				content=content,
				url=slugify(slug)
			).save()
			p = Post.objects.get(author=author,title=title,content=content)
			return redirect(f'/{author}/posts/{p.url}')
		else:
			return render(request, "new_post.html", {"form":form})
	else:
		form = NewPostForm()
		return render(request, "new_post.html", {"form":form})

def postList(request):
	post_list = Post.objects.all().order_by('-likes')[:10]
	return render(request, "post_list.html", {"post_list":post_list})

def postDetail(request, user,post):
	post = Post.objects.get(url__iexact=post)
	liked = Liker.objects.filter(user=User.objects.get(username=request.user),post=post).exists()
	return render(request, "post_detail.html", {"post":post,"liked":liked})

@csrf_exempt
def likePost(request):
	if request.method == 'POST':
		post = request.POST.get('post')
		user = request.POST.get('user')
		liked = Liker.objects.filter(user=User.objects.get(username=user),post=Post.objects.get(url=post)).exists()
		if not liked:
			l = Liker(
				user=User.objects.get(username=user),
				post=Post.objects.get(url=post),
				liked=True
			)
			l.save()
			p = Post.objects.get(url=post)
			p.likes += 1
			p.save()
		else:
			l = Liker.objects.get(user=User.objects.get(username=user),post=Post.objects.get(url=post))
			l.delete()
			p = Post.objects.get(url=post)
			p.likes -= 1
			p.save()
		return HttpResponse(liked)
	else:
		return redirect('/')

def userPost(request, user):
	user = User.objects.get(username=user)
	posts = Post.objects.filter(author=user).order_by('-likes')
	return render(request, "user_post.html", {"posts":posts})