from django.contrib import admin
from .models import (
    Category, SubCategory, Product,
    Attribute, AttributeValue, ProductAttribute
)


# ---------------------------
# Category Admin
# ---------------------------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name',)
    ordering = ('name',)


# ---------------------------
# SubCategory Admin
# ---------------------------
@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'slug')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name', 'category__name')
    list_filter = ('category',)
    ordering = ('category', 'name')


# ---------------------------
# Inline for Product Attributes
# ---------------------------
class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    extra = 1
    autocomplete_fields = ['attribute_value']


# ---------------------------
# Product Admin
# ---------------------------
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'subcategory', 'price', 'stock', 'flash_sale', 'is_featured', 'created_at')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name', 'category__name', 'subcategory__name')
    list_filter = ('category', 'subcategory', 'flash_sale', 'is_featured')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ProductAttributeInline]


# ---------------------------
# Attribute Admin
# ---------------------------
@admin.register(Attribute)
class AttributeAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name',)


# ---------------------------
# AttributeValue Admin
# ---------------------------
@admin.register(AttributeValue)
class AttributeValueAdmin(admin.ModelAdmin):
    list_display = ('attribute', 'value', 'slug')
    prepopulated_fields = {"slug": ("attribute", "value")}
    search_fields = ('attribute__name', 'value')
    list_filter = ('attribute',)


# ---------------------------
# ProductAttribute Admin
# ---------------------------
@admin.register(ProductAttribute)
class ProductAttributeAdmin(admin.ModelAdmin):
    list_display = ('product', 'attribute_value')
    search_fields = ('product__name', 'attribute_value__value')
    list_filter = ('attribute_value__attribute',)
