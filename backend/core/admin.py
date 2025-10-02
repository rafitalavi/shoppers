from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    # Fields shown in the admin list view
    list_display = ('username', 'email', 'first_name', 'last_name', 'phone', 'city', 'is_staff')
    search_fields = ('username', 'email', 'phone', 'city')
    ordering = ('username',)

    # Fields shown on the user detail page (edit form)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'phone', 'city', 'state', 'image')}),
       
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    # Fields shown on the create user form (add form)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username',
                'email',
                'first_name',
                'last_name',
                'phone',
                'city',
                'state',
                'image',
                'password1',
                'password2',
            ),
        }),
    )


admin.site.register(CustomUser, CustomUserAdmin)
