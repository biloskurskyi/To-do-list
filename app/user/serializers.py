from django.contrib.auth.base_user import BaseUserManager
from rest_framework import serializers

from core.models import User, UserPost


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'username']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

        if instance.is_superuser and not instance.username:
            instance.username = 'admin'

        instance.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPost
        fields = ['id', 'author', 'title', 'post_type']
