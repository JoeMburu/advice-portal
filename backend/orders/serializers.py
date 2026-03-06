from rest_framework import serializers
from .models import Order, OrderProduct

class OrderProductSerializer(serializers.ModelSerializer):  
  product_id = serializers.IntegerField(source='product.id', read_only=True)
  product_name = serializers.CharField(source='product.product_name')
  product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)
  subtotal = serializers.SerializerMethodField()

  class Meta:
    model = OrderProduct
    fields = [
      'id', 
      'product_id', 
      'product_name', 
      'quantity', 
      'product_price', 
      'subtotal'
    ]

  def get_subtotal(self, obj):
    return obj.product_price * obj.quantity

class OrderSerializer(serializers.ModelSerializer):
  items = serializers.SerializerMethodField()
  total_qty = serializers.SerializerMethodField()
  vat_amount = serializers.SerializerMethodField()
  grand_total = serializers.SerializerMethodField()

  class Meta:
    model = Order
    fields = [
      'id',
      'order_number', 
      'status', 
      'total_qty', 
      'vat_amount', 
      'grand_total',      
      'items'
    ]

  def get_items(self, obj):
    order_products = OrderProduct.objects.filter(order=obj).select_related("product")
    return OrderProductSerializer(order_products, many=True).data
  
  def get_total_qty(self, obj):
    order_products = OrderProduct.objects.filter(order=obj).select_related("product")
    return sum( product.quantity for product in order_products)
  
  def get_vat_amount(self, obj):
    order_products = OrderProduct.objects.filter(order=obj).select_related("product")
    return sum( product.quantity * product.product_price for product in order_products) * 0.10
  
  def get_grand_total(self, obj):
    order_products = OrderProduct.objects.filter(order=obj).select_related("product")
    return sum(product.quantity * product.product_price for product in order_products) + self.get_vat_amount(obj)
 
  