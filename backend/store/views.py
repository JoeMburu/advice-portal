from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Product
from .serializers import ProductsSerializer
from rest_framework.generics import ListAPIView



#@api_view(["GET"])
#@permission_classes([AllowAny])
class StoreListView(ListAPIView):
  queryset = Product.objects.all().filter(is_available=True)
  serializer_class = ProductsSerializer
  permission_classes = [AllowAny]
  
class StoreCategoryListView(ListAPIView):
  serializer_class = ProductsSerializer
  permission_classes = [AllowAny]

  def get_queryset(self):
      category = self.kwargs['category']
      return Product.objects.all().filter(category=category, is_available=True)