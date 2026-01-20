from django.contrib import admin
from .models import Product

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'slug', 'category', 'description', 'price', 'stock', 'is_available' )
    prepopulated_fields = { 'slug': ('product_name',)}
    search_fields = ()
    list_filter = ()
    ordering = () 
    fieldsets = ()

admin.site.register(Product, ProductAdmin)