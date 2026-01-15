from rest_framework import serializers
from .models import Accounts

class AccountsSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = Accounts
        fields = ['first_name', 'last_name', 'email',  'phone_number', 'address', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = Accounts(**validated_data)
        user.set_password(password)
        user.save()
        return user   