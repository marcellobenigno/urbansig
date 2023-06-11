from django.contrib import messages
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.messages.views import SuccessMessageMixin


class Login(SuccessMessageMixin, LoginView):
    template_name = 'seguranca/login.html'
    redirect_authenticated_user = True
    success_message = 'UrbanSIG - Seja bem vindo(a)!'


class Logout(LogoutView):
    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        messages.add_message(request, messages.INFO, 'UrbanSIG - Você saiu do sistema...')
        return response


login = Login.as_view()
logout = Logout.as_view()
