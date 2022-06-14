from attr import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Credentials

class CredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credentials
        fields = ["service", "username", "password", "profile", "id_cred"]
