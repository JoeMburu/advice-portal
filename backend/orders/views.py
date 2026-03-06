import datetime
from decimal import Decimal, ROUND_HALF_UP
from django.db import transaction
from rest_framework import status
from django.utils import timezone
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from orders.serializers import OrderSerializer
from cart.models import CartItem
from orders.models import Order, OrderProduct, Payment

from cart.utils import get_or_create_cart


VAT_RATE = 0.10  

def _money(x: Decimal) -> Decimal:
  return x.quantize(Decimal("0.01"), rounding="ROUND_HALF_UP")


@api_view(["POST"])
@permission_classes([IsAuthenticated])  # Allow any user to access this view, remove if authentication is required
def place_order(request):
  current_user = request.user

  # Check if the cart count is greater than 0, if not return an error response
  cart_items = CartItem.objects.filter(cart__user=current_user)
  cart_count = cart_items.count()
  if cart_count <= 0:
    return Response({"error": "Cart is empty"}, status=400)
  
  if (not current_user):
    return Response({"error": "User not authenticated"}, status=401)
  
  if request.method == "POST":
    request_data = request.data
    # pull data out
    contact = request_data.get("contactInfo", {})
    delivery = request_data.get("deliveryInfo", {})
    payment = request_data.get("paymentInfo", {})
    payment_method = payment.get("paymentMethod", "")

    # validate data
    email = contact.get("email", "")
    if not email:
      return Response({"error": "Email is required"}, status=400)
    
    with transaction.atomic():
      # Lock up cart + cart items to prevent changes during order processing
      cart = get_or_create_cart(request)
      
      cart_items = (
        CartItem.objects
        .select_for_update()
        .filter(cart=cart)
        .select_related("product")
      )

      if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)
      
      # Calculate totals from DB to avoid error from human manipulation

      for item in cart_items:
        print(_money(item.subtotal))

      subtotal = _money(sum(item.subtotal for item in cart_items))
      vat_amount = _money(subtotal * Decimal(VAT_RATE)) 
      grand_total = _money(subtotal + vat_amount)
      total_qty = sum(item.quantity for item in cart_items)

      # 1. Create the order
      data = Order()
      data.user = current_user
      data.first_name = contact.get("firstname", "")
      data.last_name = contact.get("lastname", "")
      data.phone = contact.get("phone", "")
      data.email = contact.get("email", "")
      data.address_line_1 = delivery.get("street", "") + " " + delivery.get("building", "")
      data.address_line_2 = delivery.get("addressLine2", "")
      data.country = delivery.get("country", "")
      data.state = delivery.get("state", "")
      data.city = delivery.get("city", "")
      data.order_total = subtotal
      data.tax = vat_amount
      data.grand_total = grand_total      
      data.ip = request.META.get("REMOTE_ADDR")
      data.save()  # Save the order to generate an order ID

      # Generate order number using the order ID and current timestamp
      yr = int(datetime.date.today().strftime("%Y"))
      dt = int(datetime.date.today().strftime("%d"))
      mt = int(datetime.date.today().strftime("%m"))
      d = datetime.date(yr, mt, dt)
      current_date = d.strftime("%Y%m%d")  # Format: YYYYMMDD
      order_number = current_date + str(data.id)  # Combine date and order ID
      data.order_number = order_number
      data.is_ordered = True
      data.save()  # Save the order with the generated order number

      # 2. Create order products and link to the order
      order_products = []
      for item in cart_items:
        order_product = OrderProduct()
        order_product.order = data
        order_product.user = current_user
        order_product.product = item.product
        order_product.quantity = item.quantity
        order_product.product_price = item.product.price
        order_product.ordered = True
        order_products.append(order_product)

      OrderProduct.objects.bulk_create(order_products)

      # 3. Create payment record (if needed) and link to the order
      payment_record = Payment()
      payment_record.user = current_user
      payment_record.payment_id = f"PAY{order_number}"  # Example payment ID, replace with actual payment gateway response
      payment_record.payment_method = payment_method
      payment_record.amount_paid = str(grand_total)  # Store as string to avoid floating point issues
      payment_record.status = "Completed"  # Example status, replace with actual payment gateway response
      payment_record.save()

      # 4. Clear the cart
      cart_items.delete()
      # update the date if available
      cart.save()

      serializer_data = OrderSerializer(data)     

      return Response({
        "message": "Order placed successfully!",
        "order": serializer_data.data,
        "delivery": {
          "address_line_1": data.address_line_1,
          "address_line_2": data.address_line_2,
          "country": data.country,
          "state": data.state,
          "city": data.city,
        },
      })
