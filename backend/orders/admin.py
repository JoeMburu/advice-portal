from django.contrib import admin

from .models import Payment, Order, OrderProduct

class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'first_name', 'last_name', 'email', 'phone', 'order_total', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'first_name', 'last_name', 'email', 'phone')
    ordering = ('-created_at',)  # Order by most recent orders first
    fieldsets = ()

admin.site.register(Payment)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderProduct)


