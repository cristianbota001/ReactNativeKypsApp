import imp
from django.contrib import admin
from .models import Credentials, Profile

admin.site.register(Credentials)
admin.site.register(Profile)
