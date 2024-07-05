from django.contrib.auth.base_user import BaseUserManager
from django.shortcuts import get_object_or_404
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

        instance.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    post_type_display = serializers.SerializerMethodField()
    author_email = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = UserPost
        fields = ['id', 'author', 'title', 'post_type', 'post_type_display', 'author_email', 'author_name']

    def get_post_type_display(self, obj):
        return obj.get_post_type_display()

    def get_author_email(self, obj):
        author = get_object_or_404(User, id=obj.author_id)
        return author.email

    def get_author_name(self, obj):
        author = get_object_or_404(User, id=obj.author_id)
        return author.name
