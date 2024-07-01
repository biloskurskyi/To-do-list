from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    # username = models.CharField(max_length=32, unique=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class UserPost(models.Model):
    INFO_POST = 0
    PERSONAL_POST = 1
    POST_TYPE = ((INFO_POST, 'Info post'), (PERSONAL_POST, 'Personal post'),)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    title = models.CharField(max_length=255)
    post_type = models.SmallIntegerField(default=INFO_POST, choices=POST_TYPE)
