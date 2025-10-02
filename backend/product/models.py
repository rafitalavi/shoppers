import os
import uuid
from django.db import models
from django.utils.text import slugify
from django.utils.deconstruct import deconstructible
from django.utils.timezone import now

# ---------------------------
# Dynamic Upload Path
# ---------------------------
@deconstructible
class UploadToPathAndRename:
    def __init__(self, base_path, field_name="id", filename="image"):
        self.base_path = base_path
        self.field_name = field_name
        self.filename = filename

    def __call__(self, instance, original_filename):
        ext = original_filename.split('.')[-1]
        obj_id = getattr(instance, self.field_name, None) or "temp"
        filename = f"{self.filename}.{ext}"
        return os.path.join(self.base_path, str(obj_id), "images", filename)


# ---------------------------
# Unique Slug Generator
# ---------------------------
def unique_slug_generator(instance, field_value, slug_field_name="slug"):
    base_slug = slugify(field_value) or str(uuid.uuid4())[:8]
    slug = base_slug
    ModelClass = instance.__class__
    num = 1
    while ModelClass.objects.filter(**{slug_field_name: slug}).exclude(pk=instance.pk).exists():
        slug = f"{base_slug}-{num}"
        num += 1
    return slug


# ---------------------------
# Category & SubCategory
# ---------------------------
class Category(models.Model):
    name = models.CharField(max_length=200, unique=True, blank=True, null=True)
    slug = models.SlugField(max_length=220, unique=True, blank=True, null=True)
    image = models.ImageField(upload_to=UploadToPathAndRename("categories"), blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if self.name and not self.slug:
            self.slug = unique_slug_generator(self, self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name or "Unnamed Category"


class SubCategory(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    slug = models.SlugField(max_length=220, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="subcategories", blank=True, null=True)
    image = models.ImageField(upload_to=UploadToPathAndRename("subcategories"), blank=True, null=True)

    class Meta:
        unique_together = ("category", "slug")
        verbose_name_plural = "Subcategories"

    def save(self, *args, **kwargs):
        if self.name and not self.slug:
            self.slug = unique_slug_generator(self, self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category.name if self.category else 'No Category'} → {self.name}"


# ---------------------------
# Attributes (e.g., Color, Size)
# ---------------------------
class Attribute(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Attributes"

    def save(self, *args, **kwargs):
        if self.name and not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name or "Unnamed Attribute"


class AttributeValue(models.Model):
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, related_name="values", blank=True, null=True)
    value = models.CharField(max_length=100, blank=True, null=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True, null=True)

    class Meta:
        unique_together = ("attribute", "value")
        verbose_name_plural = "Attribute Values"

    def save(self, *args, **kwargs):
        if self.value and self.attribute and not self.slug:
            self.slug = slugify(f"{self.attribute.name}-{self.value}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.attribute.name if self.attribute else 'No Attribute'}: {self.value or 'No Value'}"


# ---------------------------
# Product & ProductAttribute
# ---------------------------
class Product(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    slug = models.SlugField(max_length=220, unique=True, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products", blank=True, null=True)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name="products", blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    stock = models.PositiveIntegerField(default=0, blank=True, null=True)
    image = models.ImageField(upload_to=UploadToPathAndRename("products"), blank=True, null=True)
    flash_sale = models.BooleanField(default=False)
    flash_start = models.DateTimeField(blank=True, null=True)
    flash_end = models.DateTimeField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    meta_title = models.CharField(max_length=200, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    meta_image = models.ImageField(upload_to=UploadToPathAndRename("products"), blank=True, null=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if self.name and not self.slug:
            self.slug = unique_slug_generator(self, self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name or "Unnamed Product"

    def get_attributes(self):
        """
        Returns a dictionary of attribute_name -> list of values
        e.g., {'Color': ['Red', 'Blue'], 'Size': ['X', 'M', 'L']}
        """
        attr_dict = {}
        for pa in self.attributes.select_related('attribute_value__attribute').all():
            if pa.attribute_value and pa.attribute_value.attribute:
                attr_name = pa.attribute_value.attribute.name
                attr_dict.setdefault(attr_name, []).append(pa.attribute_value.value)
        return attr_dict

    def get_attributes_display(self):
        """
        Returns a formatted string for display
        """
        attr_dict = self.get_attributes()
        parts = []
        for key, values in attr_dict.items():
            parts.append(f"{key}: {', '.join(values)}")
        return " | ".join(parts)


class ProductAttribute(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="attributes", blank=True, null=True)
    attribute_value = models.ForeignKey(AttributeValue, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        unique_together = ("product", "attribute_value")

    def __str__(self):
        return f"{self.product.name if self.product else 'No Product'} → {self.attribute_value.value if self.attribute_value else 'No Value'}"
