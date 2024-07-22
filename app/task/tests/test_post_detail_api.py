from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from core.models import User, UserPost
from user.tests.test_user_api import UserApiTestsBase


class PostItemTypeChoicesTests(UserApiTestsBase, TestCase):
    def setUp(self):
        super().setUp()
        self.posts_url = reverse('task:posts')
        self.post_data = {
            "title": "To do for tess!",
            "post_type": 0
        }

    def create_post(self):
        """
        Helper method to create a post
        """
        self.register_user()
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.posts_url, self.post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data['id']

    def update_post(self, post_item_id, new_data):
        """
        Helper method to update a post by ID.
        """
        put_url = reverse('task:post', kwargs={'pk': post_item_id})
        return self.client.put(put_url, new_data, format='json')

    def get_post(self, post_item_id):
        """
        Helper method to get a post by ID.
        """
        get_url = reverse('task:post', kwargs={'pk': post_item_id})
        return self.client.get(get_url, format='json')

    def delete_post(self, menu_item_id):
        """
        Helper method to delete a post by ID.
        """
        put_url = reverse('task:post', kwargs={'pk': menu_item_id})
        return self.client.delete(put_url, format='json')

    def test_get_post(self):
        """Test that we can get a post"""
        post_item_id = self.create_post()
        response = self.get_post(post_item_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_non_exist_post(self):
        """Test that we can check other user post"""
        response = self.get_post(1)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_put_post(self):
        """
        Ensure user can update his post.
        """
        post_item_id = self.create_post()
        new_data = {
            "title": "Put req for this post!",
            "post_type": 1
        }
        response = self.update_post(post_item_id, new_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], new_data['title'])

    def test_put_incorrect_post(self):
        """
        Ensure user can not update his post with incorrect data.
        """
        post_item_id = self.create_post()
        new_data = {
            "title": "",
            "post_type": 2
        }
        response = self.update_post(post_item_id, new_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_post(self):
        """
        Ensure user can delete his post.
        """
        post_item_id = self.create_post()
        response = self.delete_post(post_item_id)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Delete successful!')

    def test_delete_incorrect_post(self):
        """
        Ensure user can not delete other post.
        """
        response = self.delete_post(5)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
