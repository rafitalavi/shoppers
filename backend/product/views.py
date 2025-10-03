from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Category, SubCategory
from .serializers import ProductSerializer, CategorySerializer, SubCategorySerializer , ProductDetailSerializer
from django.shortcuts import get_object_or_404

# -------------------------
# Get all products
# -------------------------
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Product
from .serializers import ProductSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Product
from .serializers import ProductSerializer
# -------------------------
# Get all products
# -------------------------
@api_view(["GET"])
def products_list(request):
    """
    Returns paginated products with optional filters:
    - category: int (category ID)
    - subcategory: int (subcategory ID)
    - page: int (pagination)
    - latest: int (if 1, returns only latest 8 products)
    """

    products = Product.objects.all().order_by('-created_at')

    # ----- Filtering -----
    category_id = request.query_params.get('category')
    subcategory_id = request.query_params.get('subcategory')
    latest = request.query_params.get('latest')

    if category_id:
        products = products.filter(category_id=category_id)
    if subcategory_id:
        products = products.filter(subcategory_id=subcategory_id)

    if latest == '1':
        # Return only latest 8 products without pagination
        products = products[:8]
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    # ----- Pagination -----
    paginator = PageNumberPagination()
    paginator.page_size = 16  # 16 products per page
    result_page = paginator.paginate_queryset(products, request)

    serializer = ProductSerializer(result_page, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)

# -------------------------
# Get single producs
# -------------------------

@api_view(["GET"])
def product_detail(request, slug):
    """
    Returns a single product by slug
    """
    product = get_object_or_404(Product, slug=slug)
    serializer = ProductDetailSerializer(product, context={'request': request})
    return Response(serializer.data)


# -------------------------
# Get all categories
# -------------------------
@api_view(["GET"])
def categories_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# -------------------------
# Get all subcategories
# -------------------------
@api_view(["GET"])
def subcategories_list(request):
    subcategories = SubCategory.objects.all()
    serializer = SubCategorySerializer(subcategories, many=True)
    return Response(serializer.data)
