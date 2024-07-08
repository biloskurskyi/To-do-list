from django.contrib import admin
from django.urls import include, path

# from app.app import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user.urls', namespace='user')),
]

# if settings.DEBUG:
#     urlpatterns.append(path('__debug__/', include('debug_toolbar.urls')))
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
