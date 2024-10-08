import re

from decouple import config
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', False)
        user = self.model(email=email, **extra_fields)
        user.set_is_active(False)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        extra_fields.pop('username', None)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    # username = models.CharField(max_length=32, unique=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return f"{self.name} with email {self.email}"

    def set_password(self, raw_password):
        # Custom password validation
        if len(raw_password) < config('PASSWORD_LENGTH'):
            raise ValidationError("Password must be at least 8 characters long.")
        if not re.search(r'[A-Z]', raw_password):
            raise ValidationError("Password must contain at least one uppercase letter.")

        # If the validation passes, set the password using Django's built-in method
        super().set_password(raw_password)


class UserPost(models.Model):
    INFO_POST = 0
    PERSONAL_POST = 1
    POST_TYPE = ((INFO_POST, 'Info post'), (PERSONAL_POST, 'Personal post'),)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    title = models.CharField(max_length=255)
    post_type = models.SmallIntegerField(choices=POST_TYPE)

    class Meta:
        verbose_name = "User post"
        verbose_name_plural = "User posts"
