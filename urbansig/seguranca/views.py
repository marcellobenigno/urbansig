from django.contrib.auth.views import LoginView
from django.contrib.messages.views import SuccessMessageMixin


class Login(SuccessMessageMixin, LoginView):
    template_name = 'seguranca/login.html'
    redirect_authenticated_user = True
    success_message = 'UrbanSIG - Seja bem vindo(a)!'


login = Login.as_view()
