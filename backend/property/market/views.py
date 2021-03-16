from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Propertyh, Seller
from .serializers import PropertySerializer, SellerSerializer
from rest_framework import filters, generics


@csrf_exempt
def property_list(request):
    if request.method == 'GET':
        properties = Propertyh.objects.all()
        serializer = PropertySerializer(properties, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PropertySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    

@csrf_exempt
def property_detail(request, pk):

    try:
        propertyh = Propertyh.objects.get(pk=pk)
    except Propertyh.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        serializer = PropertySerializer(propertyh)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PropertySerializer(propertyh, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        propertyh.delete()
        return HttpResponse(status=204)


class PropertyListView(generics.ListAPIView):
    queryset = Propertyh.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['suburb']


@csrf_exempt
def seller_list(request):
    if request.method == 'GET':
        sellers = Seller.objects.all()
        serializer = SellerSerializer(sellers, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JsonResponse().parse(request)
        serializer = SellerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def seller_detail(request, pk):
    try: 
        seller = Seller.objects.get(pk=pk)
    except Seller.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        serializer = SellerSerializer(seller)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SellerSerializer(seller, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        seller.delete()
        return HttpResponse(status=204)


class SellerListView(generics.ListAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'properties__suburb']   
