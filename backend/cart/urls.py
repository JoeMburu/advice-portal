from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

  path("", views.get_cart, name="get-cart"),
  path("add/<int:product_id>/", views.add_to_cart, name="add-to-cart"),
  path("decrease_product/<int:product_id>/", views.decrease_cart_item, name="decrease-cart-item"),
  path("remove/<int:product_id>/", views.remove_from_cart, name="remove-from-cart"),

  path("checkout/", views.checkout, name="checkout"),

]  

