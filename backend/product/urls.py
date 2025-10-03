from django.urls import path
from .views import products_list, categories_list, subcategories_list , product_detail

urlpatterns = [
    path('products/', products_list, name='products-list'),
    path('categories/', categories_list, name='categories-list'),
    path('subcategories/', subcategories_list, name='subcategories-list'),
    path('products/<slug:slug>/', product_detail, name='product-detail'),
]
