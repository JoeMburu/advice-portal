from .models import CartItem

def build_cart_response(request, cart):
    cart_items = (
        CartItem.objects
        .filter(cart=cart, is_active=True)
        .select_related("product")
    )
    total = sum((item.sub_total() for item in cart_items), 0)
    total_qty = sum((item.quantity for item in cart_items), 0)
    return cart_items, total, total_qty