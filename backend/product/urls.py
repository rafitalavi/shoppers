from django.urls import path
from .views import products_list, categories_list, subcategories_list

urlpatterns = [
    path('products/', products_list, name='products-list'),
    path('categories/', categories_list, name='categories-list'),
    path('subcategories/', subcategories_list, name='subcategories-list'),
]
