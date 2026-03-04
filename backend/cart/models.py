from decimal import Decimal

from django.db import models
from accounts.models import Accounts
from store.models import Product


VAT_RATE = Decimal("0.24")



class Cart(models.Model):
  # One cart per user (logged-in user)
  user = models.OneToOneField(Accounts, on_delete=models.CASCADE, null=True, blank=True, related_name="cart")
  cart_id = models.CharField(max_length=250, null=True, blank=True, unique=True, db_index=True)
  created_at = models.DateTimeField(auto_now_add=True)
  

  def __str__(self):
    if self.user_id:
      return f"Cart(user_id={self.user_id})"
    return f"Cart(cart_id={self.cart_id})"
  
  @property
  def total(self):
    return sum(item.subtotal for item in self.items.all())
  
  @property
  def vat_rate(self):
    return VAT_RATE
  
  @property
  def vat_amount(self):
    return self.total * self.vat_rate
  
  @property
  def grand_total(self):
    return self.total + self.vat_amount

    
class CartItem(models.Model):  
  cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
  product = models.ForeignKey(Product, on_delete=models.CASCADE)
  quantity = models.PositiveIntegerField(default=1)

  class Meta:
    ordering = ['id']  # Ensure consistent ordering of items


  def __str__(self):
    return f"CartItem: {self.quantity} x {self.product.product_name}"
  
  @property
  def subtotal(self):
    return self.quantity * self.product.price