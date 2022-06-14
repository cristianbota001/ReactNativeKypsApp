from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_auth_id = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username

class Credentials(models.Model):
    service = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    id_cred = models.AutoField(primary_key=True)

    def __str__(self):
        return self.profile.user.username + "_" + self.service



