from rest_framework import serializers
from .models import Product
from category.models import Category

class ProductsSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__' 
        
    def get_product_image(self, obj):
        if not obj.product_image:
            return ""
        return obj.product_image.url
    
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'