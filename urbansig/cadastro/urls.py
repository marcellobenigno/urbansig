from django.urls import path

from . import views as v

app_name = 'cadastro'

urlpatterns = [
    path('', v.lote_list, name='lote_list'),
    path('novo/', v.lote_create, name='lote_create'),
]
