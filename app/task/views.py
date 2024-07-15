from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import User, UserPost

from .serializers import PostSerializer


class PostsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        posts = UserPost.objects.filter(author_id=user.id)
        serializer = PostSerializer(posts, many=True)
        if not posts.exists():
            return Response({"message": "No posts found for this user"}, status=200)

        return Response(serializer.data)

    def post(self, request):
        request.data['author'] = request.user.id
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class PostDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    # serializer_class = PostSerializer

    def get(self, request, pk):
        user = request.user
        post = UserPost.objects.filter(id=pk, author_id=user.id).first()
        if not post:
            return Response({"error": "Post not found"}, status=404)

        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk):
        user = request.user
        request.data['author'] = user.id
        post = UserPost.objects.filter(id=pk, author_id=user.id).first()
        if not post:
            return Response({"error": "Post not found"}, status=404)

        title = request.data.get('title', post.title)
        post_type = request.data.get('post_type', post.post_type)
        serializer = PostSerializer(post, data={'title': title, 'post_type': post_type, 'author': user.id},
                                    partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        user = request.user
        post = UserPost.objects.filter(id=pk, author_id=user.id).first()
        if not post:
            return Response({"error": "Post not found"}, status=404)

        try:
            post.delete()
            return Response({
                'message': 'Delete successful!'
            }, status=204)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


class PostTypeChoicesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        choices = UserPost.POST_TYPE
        return Response(choices)
