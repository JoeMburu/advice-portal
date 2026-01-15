from django.contrib import admin
from .models import Accounts

class AccountsAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'last_login', 'date_joined', 'is_admin', 'is_staff', 'is_active', 'password')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    readonly_fields = ('date_joined', 'last_login', 'password')
    list_display_links = ('email', 'username', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()



admin.site.register(Accounts, AccountsAdmin)