from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView
from store.serializers import ProductsSerializer 
from store.models import Product



class ProductListView(ListAPIView):
  queryset = Product.objects.all().filter(is_available=True)
  serializer_class = ProductsSerializer
  permission_classes = [AllowAny]
  

