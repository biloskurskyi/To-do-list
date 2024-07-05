from django.urls import path

from .views import (DeleteView, LoginView, LogoutView, PostDetailView,
                    PostsView, PostTypeChoicesView, RegisterView)

app_name = 'user'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('delete/', DeleteView.as_view(), name='delete'),

    path('posts/', PostsView.as_view(), name='posts'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post'),

    path('post-type-choices/', PostTypeChoicesView.as_view(), name='post_type_choices'),
]
