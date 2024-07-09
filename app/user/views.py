import datetime

import jwt
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from app.settings import FRONTEND_BASE_URL
from core.models import User, UserPost

from .serializers import PostSerializer, UserSerializer


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        frontend_base_url = FRONTEND_BASE_URL  # Replace with your actual frontend base URL
        activation_link = f"{frontend_base_url}/activate/{user.id}/"
        print(activation_link)
        subject = 'Welcome to Our Service'
        message = (
            f"Thank you for registering. Your account is currently inactive. "
            f"For activate click this link: {activation_link}")  # {activation_link}
        # f"For activate click this link: http://localhost:8000/api/activate/{user.id}/")
        from_email = 'digitalautoservice2024@gmail.com'
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)
        return Response(serializer.data)


class ActivateUserView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        user.is_active = True
        user.save()
        return Response({'message': 'User activated successfully'}, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        if not user.is_active:
            raise AuthenticationFailed('User not active!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        return Response({'jwt': token, 'id': user.id})


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'massage': 'success'
        }
        return response


class DeleteView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        user = request.user

        posts = UserPost.objects.filter(author=user)
        if posts.exists():
            posts.delete()

        user.delete()
        return Response({'message': 'User deleted successfully'})


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

# def get_author_name(author_id):
#     user = get_object_or_404(User, id=author_id)
#     return user.name
