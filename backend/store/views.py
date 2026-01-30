from unicodedata import category
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Product
from category.models import Category
from .serializers import CategorySerializer, ProductsSerializer
from rest_framework.generics import ListAPIView


class ProductListView(ListAPIView): # Get all available products
  queryset = Product.objects.all().filter(is_available=True)
  serializer_class = ProductsSerializer
  permission_classes = [AllowAny]

  
class CategoryListView(ListAPIView): # Get all product categories
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
  permission_classes = [AllowAny]  


class ProductsByCategoryView(ListAPIView): # Get products by category
  serializer_class = ProductsSerializer
  permission_classes = [AllowAny]



class ProductDetailView(ListAPIView):
  serializer_class = ProductsSerializer
  permission_classes = [AllowAny]

  def get_queryset(self):
      return Product.objects.filter(slug=self.kwargs["slug"])

  