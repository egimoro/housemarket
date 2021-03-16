from rest_framework import serializers
from .models import Propertyh, Seller


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Propertyh
        fields = '__all__'


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = '__all__'
    
    