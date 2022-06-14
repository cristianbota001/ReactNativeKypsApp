from django import forms
import re
from django.contrib.auth.models import User

class RegistrationForm(forms.Form):

    username = forms.CharField(required=False)
    password1 = forms.CharField(required=False)
    password2 = forms.CharField(required=False)

    def clean(self):
        
        cred = super().clean()

        if cred.get("username") != "":
            if re.findall("[ -/-:-@-[-^-{-⁓]",cred.get("username")):
                self.add_error("username", "L'username può solo contenere lettere e numeri")
        else:
            self.add_error("username", "Inserire l'username")
        
        user_db = User.objects.filter(username = cred.get("username"))
        
        if user_db.exists():
            self.add_error("username", "Username già esistente")

        if cred.get("password1") != "":
            if re.findall("[ -/-:-@-[-^-{-⁓]", cred.get("password1")):
                self.add_error("password1","La password può solo contenere lettere e numeri")  
            elif not cred.get("password1") == cred.get("password2"):
                self.add_error("password2","Password non inserita correttamente")
        else:
            self.add_error("password1", "Inserire la password")
        
class LoginForm(forms.Form):

    username = forms.CharField(required=False)
    password1 = forms.CharField(required=False)

    def clean(self):
        cred = super().clean()

        if cred.get("username") != "":
            if re.findall("[ -/-:-@-[-^-{-⁓]",cred.get("username")):
                self.add_error("username", "L'username può solo contenere lettere e numeri")
        else:
            self.add_error("username", "Inserire l'username")
        
        if cred.get("password1") != "":
            if re.findall("[ -/-:-@-[-^-{-⁓]", cred.get("password1")):
                self.add_error("password1","La password può solo contenere lettere e numeri")
        else:
            self.add_error("password1", "Inserire la password")