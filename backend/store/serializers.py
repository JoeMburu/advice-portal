from rest_framework import serializers
from .models import Product
from category.models import Category

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  

    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'