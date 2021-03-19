from django.urls import path
from . import views


urlpatterns = [
    path('markets', views.property_list),
    path('markets/<int:pk>', views.property_detail),
    path('markets/suburb/', views.PropertyListView.as_view()),
    path('sellers', views.seller_list),
    path('sellers/<int:pk>', views.seller_detail),
    path('sellers/name/', views.SellerListView.as_view())
] 