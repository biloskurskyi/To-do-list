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

from .serializers import UserSerializer
from .tasks import send_registration_email
from .utils import decode_activation_token, generate_activation_token


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token = generate_activation_token(user.id)

        frontend_base_url = FRONTEND_BASE_URL
        subject = 'Welcome to Our Service'
        message = (
            f"Thank you for registering. Your account is currently inactive. "
            f"For activate click this link: {frontend_base_url}/activate/{token}/")
        from_email = 'digitalautoservice2024@gmail.com'
        recipient_list = [user.email]

        send_registration_email.delay(subject, message, from_email, recipient_list)
        # send_mail(subject, message, from_email, recipient_list)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ActivateUserView(APIView):
    permission_classes = []

    def get(self, request, token):
        # user = get_object_or_404(User, pk=user_id)
        # user.is_active = True
        # user.save()
        # return Response({'message': 'User activated successfully'}, status=status.HTTP_200_OK)
        user_id = decode_activation_token(token)
        if not user_id:
            return Response({'message': 'Invalid or expired activation link'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, id=user_id)
        user.is_active = True
        user.save()
        return Response({'message': 'User activated successfully!'}, status=status.HTTP_200_OK)


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
            'message': 'success'
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
