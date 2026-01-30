from rest_framework import serializers
from .models import Product
from category.models import Category

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__' 
        
    def get_product_image(self, obj):
        if not obj.product_image:
            return ""
        request = self.context.get("request")
        url = obj.product_image.url  # dev: /media/photos/..  prod: https://res.cloudinary.com/...
        return request.build_absolute_uri(url) if request else url 
    
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'