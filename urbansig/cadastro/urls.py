from django.urls import path

from . import views as v

app_name = 'cadastro'

urlpatterns = [
    path('', v.imovel_list, name='imovel_list'),
]
