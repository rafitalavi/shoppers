from rest_framework import serializers
from .models import Product, Category, SubCategory, Attribute, AttributeValue, ProductAttribute


# -------------------------
# Category Serializer
# -------------------------
class CategorySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True, use_url=True) 
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image']


# -------------------------
# SubCategory Serializer
# -------------------------
class SubCategorySerializer(serializers.ModelSerializer):
    # Remove nested category, only keep its ID or name
    category_id = serializers.IntegerField(source='category.id', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'slug', 'category_id', 'category_name', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None



# -------------------------
# AttributeValue Serializer
# -------------------------
class AttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeValue
        fields = ['id', 'value', 'slug']


# -------------------------
# Attribute Serializer (with values)
# -------------------------
class AttributeSerializer(serializers.ModelSerializer):
    values = AttributeValueSerializer(many=True, read_only=True)

    class Meta:
        model = Attribute
        fields = ['id', 'name', 'slug', 'values']


# -------------------------
# ProductAttribute Serializer
# -------------------------
class ProductAttributeSerializer(serializers.ModelSerializer):
    attribute_value = AttributeValueSerializer(read_only=True)

    class Meta:
        model = ProductAttribute
        fields = ['id', 'attribute_value']


# -------------------------
# Product Serializer
# -------------------------
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)
    attributes = ProductAttributeSerializer(many=True, read_only=True)
    attributes_display = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'subcategory',
            'description', 'price', 'discount_price',
            'stock', 'image', 'flash_sale', 'flash_start', 'flash_end',
            'is_featured', 'created_at', 'updated_at',
            'attributes', 'attributes_display',
        ]

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None

    def get_attributes_display(self, obj):
        attr_dict = {}
        for pa in obj.attributes.select_related('attribute_value__attribute').all():
            name = pa.attribute_value.attribute.name
            value = pa.attribute_value.value
            attr_dict.setdefault(name, []).append(value)
        return {k: ', '.join(v) for k, v in attr_dict.items()}
    


# -------------------------
# Product Detail Serializer
# -------------------------

from rest_framework import serializers

class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)
    attributes = ProductAttributeSerializer(many=True, read_only=True)
    attributes_display = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    # SerializerMethodField
    related_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'subcategory',
            'description', 'price', 'discount_price',
            'stock', 'image', 'flash_sale', 'flash_start', 'flash_end',
            'is_featured', 'created_at', 'updated_at',
            'attributes', 'attributes_display',
            'related_products',  # ✅ must include here
        ]

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None

    def get_attributes_display(self, obj):
        attr_dict = {}
        for pa in obj.attributes.select_related('attribute_value__attribute').all():
            name = pa.attribute_value.attribute.name
            value = pa.attribute_value.value
            attr_dict.setdefault(name, []).append(value)
        return {k: ', '.join(v) for k, v in attr_dict.items()}

    def get_related_products(self, obj):
        # Try subcategory first
        if obj.subcategory:
            qs = Product.objects.filter(subcategory=obj.subcategory).exclude(id=obj.id)
            if qs.exists():
                return ProductSerializer(qs, many=True, context=self.context).data
        # Fallback to category
        qs = Product.objects.filter(category=obj.category).exclude(id=obj.id)
        return ProductSerializer(qs, many=True, context=self.context).data
