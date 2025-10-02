from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.deconstruct import deconstructible
import os

# ---------------------------
# File upload handler
# ---------------------------
@deconstructible
class UploadToPathAndRename:
    def __init__(self, path):
        self.path = path  # base path for uploads

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        filename = f'profile_image.{ext}'  # rename file
        # path: accounts/<user_id>/images/profile_image.ext
        full_path = os.path.join(self.path, str(instance.id), 'images')
        return os.path.join(full_path, filename)

# Instantiate the upload path
file_path = UploadToPathAndRename('accounts')


# ---------------------------
# Custom User Model
# ---------------------------
class CustomUser(AbstractUser):
    city = models.CharField(max_length=200, blank=True, null=True)
    state = models.CharField(max_length=200, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    image = models.ImageField(upload_to=file_path, blank=True, null=True)

    def __str__(self):
        return self.username
