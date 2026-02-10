from rest_framework import serializers
from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):  
  product_id = serializers.IntegerField(source='product.id', read_only=True)
  product_name = serializers.CharField(source='product.product_name', read_only=True)
  product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)  
  product_image = serializers.SerializerMethodField()
  subtotal = serializers.SerializerMethodField()

  class Meta:
    model = CartItem
    fields = '__all__'

  def get_product_image(self, obj):
    if obj.product.product_image:
      return obj.product.product_image.url
    return ""  
  
  def get_subtotal(self, obj):
    return f"{obj.quantity * obj.product.price}"
  
class CartSerializer(serializers.ModelSerializer):
  items = CartItemSerializer(many=True, read_only=True)
  total = serializers.SerializerMethodField()
  total_qty = serializers.SerializerMethodField()

  class Meta:
    model = Cart
    fields = '__all__'

  def get_total(self, obj):
    return obj.total
  
  def get_total_qty(self, obj):
    return sum(item.quantity for item in obj.items.all())