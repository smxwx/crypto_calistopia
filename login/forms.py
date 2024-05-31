from django import forms
from django_recaptcha.fields import ReCaptchaField

class PasswordResetForm(forms.Form):
    user = forms.CharField(max_length=255, required=True, widget=forms.TextInput(attrs={'placeholder': 'Nombre de usuario o correo electrónico'}))
    captcha = ReCaptchaField()
