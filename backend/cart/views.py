from django.shortcuts import render, get_object_or_404
from django.db import transaction
from .serializers import CartSerializer, CartItemSerializer
from .utils import build_cart_response
from store.models import Product
from store.serializers import ProductsSerializer
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Cart, CartItem
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

def _cart_id(request):
    # Ensure a non-null session key    
    if not request.session.session_key:
        request.session.save()
    return request.session.session_key

# Move/merge items from from_chart into to_cart, the delete from_cart
def _merge_carts(from_cart: Cart, to_cart: Cart):
    for item in from_cart.items.select_related("product").all():
        to_item, created = CartItem.objects.get_or_create(
            cart=to_cart,
            product=item.product,
            defaults={'quantity': item.quantity}
        )
        if not created:
            to_item.quantity += item.quantity
            to_item.save()
    from_cart.delete()

@transaction.atomic
def _get_or_create_cart(request) -> Cart:
    """
    - If authenticated: get/create the user's cart, merge session cart into it (if exists).
    - If anonymous: get/create the session cart.
    """
    user = request.user if request.user.is_authenticated else None    
    session_cart_id = _cart_id(request)
    
    # Fetch guest cart (if it exists)
    guest_cart = (
        Cart.objects.select_for_update()
        .filter(user__isnull=True, cart_id=session_cart_id)
        .first()
    )

    if user:
        user_cart, created = Cart.objects.select_for_update().get_or_create(user=user)

        # Merge guest cart into user cart (once the user is authenticated)
        if guest_cart and guest_cart.id != user_cart.id:
            _merge_carts(guest_cart, user_cart)
        return user_cart
    
    # Anonymous
    cart, created = Cart.objects.get_or_create(user=None, cart_id=session_cart_id)
    return cart


@api_view(["GET"])
@permission_classes([AllowAny])
def get_cart(request):  
    print("Retrieving cart for user:", request.user if request.user.is_authenticated else "Anonymous") 
    user = request.user if request.user.is_authenticated else None        
    cart = _get_or_create_cart(request)    
    serializer = CartSerializer(cart)
    return Response({"message": "cart retrieved", "cart": serializer.data}, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([AllowAny])
def add_to_cart(request, product_id):
    cart = _get_or_create_cart(request)
    product = get_object_or_404(Product, id=product_id)
    qty = int(request.data.get("quantity", 1))  # default = 1
    item, created = CartItem.objects.get_or_create(cart=cart, product=product) 

    if created:
        item.quantity = qty
    else:
        item.quantity += qty

    item.save()
    print(item)

    serializer = CartSerializer(cart)
    return Response(
        {"message": "Product added to the cart", "cart": serializer.data},
        status=status.HTTP_200_OK,
    )

@api_view(["POST"])
@permission_classes([AllowAny])
def remove_from_cart(request, product_id):
    cart = _get_or_create_cart(request)
    product = get_object_or_404(Product, id=product_id)

    cart_item = get_object_or_404(CartItem, cart=cart, product=product)
    cart_item.delete()

    return Response({"message": "Product removed from the cart"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def decrease_cart_item(request, product_id):
    cart = _get_or_create_cart(request)
    product = get_object_or_404(Product, id=product_id)

    cart_item = get_object_or_404(CartItem, cart=cart, product=product)

    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        cart_item.save()
    else:
        cart_item.delete()

    serializer = CartSerializer(cart)
    return Response(
        {"message": "Product quantity decreased", "cart": serializer.data},
        status=status.HTTP_200_OK,
    )



