from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from unittest.mock import patch

from user.tests.test_user_api import UserApiTestsBase


@patch('user.tasks.send_registration_email')
class PostApiTest(UserApiTestsBase, TestCase):
    """Test the features of the menu(MenuView) API."""

    def setUp(self):
        super().setUp()
        self.posts_url = reverse('task:posts')
        self.post_data = {
            "title": "To do for tess!",
            "post_type": 0
        }

    def test_get_all_posts(self, mock_send_email):
        """Test that all posts are returned."""
        self.register_user()
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(self.posts_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        mock_send_email.assert_not_called()

    def test_create_post(self, mock_send_email):
        """Test should create post successfully."""
        self.register_user()
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.posts_url, self.post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        mock_send_email.assert_not_called()

    def test_incorrect_create_post(self, mock_send_email):
        """Test can not create post """
        self.register_user()
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        self.post_data["post_type"] = 2
        response = self.client.post(self.posts_url, self.post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        mock_send_email.assert_not_called()
