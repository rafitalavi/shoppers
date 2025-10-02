from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Category, SubCategory
from .serializers import ProductSerializer, CategorySerializer, SubCategorySerializer


# -------------------------
# Get all products
# -------------------------
@api_view(["GET"])
def products_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True, context={'request': request})
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
