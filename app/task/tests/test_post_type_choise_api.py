from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from core.models import UserPost
from user.tests.test_user_api import UserApiTestsBase


class PostTypeChoicesTests(UserApiTestsBase, TestCase):
    def setUp(self):
        super().setUp()
        self.post_type_choices_url = reverse('task:post_type_choices')

    def test_get_post_type_choices(self):
        """Test retrieving post type choices."""
        response_register = self.register_user()
        self.assertEqual(response_register.status_code, status.HTTP_201_CREATED)
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.get(self.post_type_choices_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_choices = tuple(UserPost.POST_TYPE)
        self.assertEqual(response.data, expected_choices)

    def test_get_post_type_choices_unauthenticated(self):
        """Test retrieving post type choices without authentication."""
        response = self.client.get(self.post_type_choices_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
