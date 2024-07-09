from django.urls import path

from .views import (ActivateUserView, DeleteView, LoginView, LogoutView,
                    PostDetailView, PostsView, PostTypeChoicesView,
                    RegisterView)

app_name = 'user'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('delete/', DeleteView.as_view(), name='delete'),

    path('activate/<str:token>/', ActivateUserView.as_view(), name='activate-user'),

    path('posts/', PostsView.as_view(), name='posts'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post'),

    path('post-type-choices/', PostTypeChoicesView.as_view(), name='post_type_choices'),
]
