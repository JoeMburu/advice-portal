from django.contrib import admin

# Register your models here.

from .models import Category

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name', 'slug', 'description', 'cat_image')
    prepopulated_fields = {'slug': ('category_name',)}
    search_fields = ('category_name', 'description')
    list_filter = ('category_name',)
    ordering = ('category_name',) 
    fieldsets = ()

admin.site.register(Category, CategoryAdmin)

