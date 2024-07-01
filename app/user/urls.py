from django.urls import path

from .views import (LoginView, LogoutView, PostDetailView, PostsView,
                    RegisterView)

app_name = 'user'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    # path('user/', UserView.as_view(), name='user'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('posts/', PostsView.as_view(), name='posts'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post')
]
