from curses.ascii import HT
from django.http import HttpResponse, JsonResponse, QueryDict
from .serializer import CredentialsSerializer
from .models import Credentials, Profile
from django.views.decorators.csrf import csrf_exempt
from .forms import RegistrationForm, LoginForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import base64
import os
import json

@csrf_exempt
def Registration(request):
    context = {}
    context["form"] = RegistrationForm(request.POST or None)
    if request.method == "POST":
        if context["form"].is_valid():
            username = context["form"].cleaned_data["username"]
            password = context["form"].cleaned_data["password1"]
            user_auth_id = GetNewID()
            user = User.objects.create_user(username = username, password = password)
            Profile.objects.create(user = user, user_auth_id = user_auth_id)
            return JsonResponse({"response":"ok", "user_auth_id":user_auth_id})
        else:
            context["errors"] = context["form"].errors
            return JsonResponse({"response":{"errors":context["errors"]}})
    return HttpResponse(status=403)

@csrf_exempt
def Login(request):
    context = {}
    context["form"] = LoginForm(request.POST or None)
    if request.method == "POST":
        if context["form"].is_valid():
            username = context["form"].cleaned_data["username"]
            password1 = context["form"].cleaned_data["password1"]
            if authenticate(username = username, password = password1):
                return JsonResponse({"response":"ok", "user_auth_id":GetUserAuthID(username)})
            else:
                return JsonResponse({"response":{"errors":{"username":["Utente o password errati"]}}})
        else:
            context["errors"] = context["form"].errors
            return JsonResponse({"response":{"errors":context["errors"]}})
   
    return HttpResponse(status=403)

def GetUserAuthID(username):
    user = User.objects.filter(username = username).first()
    profile = Profile.objects.filter(user = user).first()
    auth_id = profile.user_auth_id
    return auth_id

def GetNewID():
    ris = Profile.objects.all()
    id_list = [x.user_auth_id for x in ris]
    while True:
        new_id = base64.urlsafe_b64encode(os.urandom(50)).decode()
        if new_id not in id_list:
            return new_id

def CheckAuthID(user_auth_id):
    user_auth_id = Profile.objects.filter(user_auth_id = user_auth_id)
    if not user_auth_id.exists():
        return HttpResponse(status = 404)

def GetCredentials(request, user_auth_id):
    if request.method == "GET":
        CheckAuthID(user_auth_id)
        creds = Credentials.objects.filter(profile = Profile.objects.filter(user_auth_id = user_auth_id).first())
        credentials = CredentialsSerializer(creds, many = True)
        return JsonResponse({"response":credentials.data}, safe=False)
    return HttpResponse(status=403)

@csrf_exempt
def PostCredentials(request):
    if request.method == "POST":
        CheckAuthID(request.POST["user_auth_id"])
        profile = Profile.objects.filter(user_auth_id = request.POST["user_auth_id"]).first()
        data = request.POST.copy()
        data["profile"] = profile.id
        del data["user_auth_id"]
        credentials = CredentialsSerializer(data=data)
        if credentials.is_valid():
            credentials.save()
            return JsonResponse({"response":"ok", "id_cred":credentials.data["id_cred"]})
        else:
            return JsonResponse({"response":"nok"})
    return HttpResponse(status=403)

@csrf_exempt
def DeleteCredentials(request, id_cred, user_auth_id):
    if request.method == "DELETE":
        profile = Profile.objects.filter(user_auth_id = user_auth_id).first()
        cred = Credentials.objects.filter(id_cred = id_cred, profile = profile)
        if cred.exists():
            cred.delete()
            return JsonResponse({"response":"ok"})
        else:
            return JsonResponse({"response":"nok"})
    return HttpResponse(status=403)

@csrf_exempt
def PutCredentials(request, id_cred, user_auth_id, form_data):
    if request.method == "PUT":
        form_data = json.loads(form_data)
        profile = Profile.objects.filter(user_auth_id = user_auth_id).first()
        cred = Credentials.objects.filter(id_cred = id_cred, profile = profile)
        if cred.exists():
            form_data["profile"] = profile.id
            serializer = CredentialsSerializer(cred.first(), data=form_data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"response":"ok"})
    return HttpResponse(status=403)