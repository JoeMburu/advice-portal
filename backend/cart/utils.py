from .models import CartItem, Cart
from django.db import transaction
from store.models import Product

def build_cart_response(request, cart):
    cart_items = (
        CartItem.objects
        .filter(cart=cart, is_active=True)
        .select_related("product")
    )
    total = sum((item.sub_total() for item in cart_items), 0)
    total_qty = sum((item.quantity for item in cart_items), 0)
    return cart_items, total, total_qty


def cart_id(request):
    # Ensure a non-null session key    
    if not request.session.session_key:
        request.session.save()
    return request.session.session_key

# Move/merge items from from_chart into to_cart, the delete from_cart
def merge_carts(from_cart: Cart, to_cart: Cart):
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
def get_or_create_cart(request) -> Cart:
    """
    - If authenticated: get/create the user's cart, merge session cart into it (if exists).
    - If anonymous: get/create the session cart.
    """
    user = request.user if request.user.is_authenticated else None    
    session_cart_id = cart_id(request)
    
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
            merge_carts(guest_cart, user_cart)
        return user_cart
    
    # Anonymous
    cart, created = Cart.objects.get_or_create(user=None, cart_id=session_cart_id)
    return cart