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
    fields = ['id', 'product_id', 'product_name', 'product_price', 'product_image', 'quantity', 'subtotal']

  def get_product_image(self, obj):
    if obj.product.product_image:
      return obj.product.product_image.url
    return ""  
  
  def get_subtotal(self, obj):
    return f"{obj.quantity * obj.product.price}"
  
class CartSerializer(serializers.ModelSerializer):
  items = CartItemSerializer(many=True, read_only=True)
  sub_total = serializers.SerializerMethodField()
  vat_amount = serializers.SerializerMethodField()
  grand_total = serializers.SerializerMethodField()
  total_qty = serializers.SerializerMethodField()

  class Meta:
    model = Cart
    fields = ['id', 'items', 'sub_total', 'vat_amount', 'grand_total', 'total_qty']

  def get_sub_total(self, obj):
    return obj.total
  
  def get_vat_amount(self, obj):
    return obj.vat_amount

  def get_grand_total(self, obj):
    return obj.grand_total

  def get_total_qty(self, obj):
    return sum(item.quantity for item in obj.items.all())