"""
Django admin customization.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
from core import models


class UserAdmin(BaseUserAdmin):
    """Define the admin pages for user."""
    ordering = ['id']
    list_display = ['email', 'name', 'is_active', 'is_superuser']
    search_fields = ['email', 'name', 'is_active', 'is_superuser']
    readonly_fields = ['email', 'name', ]
    list_per_page = 15

    fieldsets = (
        (None, {'fields': ('email', 'name', 'is_active', 'is_staff', 'is_superuser', 'last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )


admin.site.register(models.User, UserAdmin)


class UserPostAdmin(admin.ModelAdmin):
    """Define the admin pages for user posts."""
    ordering = ['id']
    list_display = ['title', 'author', 'post_type', ]
    search_fields = ['title', 'author', 'post_type', ]
    readonly_fields = ['author', ]
    list_per_page = 15


admin.site.register(models.UserPost, UserPostAdmin)
