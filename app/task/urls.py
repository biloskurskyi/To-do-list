from django.urls import path

from .views import (PostDetailView, PostsView, PostTypeChoicesView, )

app_name = 'task'

urlpatterns = [
    path('posts/', PostsView.as_view(), name='posts'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post'),

    path('post-type-choices/', PostTypeChoicesView.as_view(), name='post_type_choices'),
]
