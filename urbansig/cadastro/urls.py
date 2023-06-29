from django.urls import path, include
from rest_framework import routers

from . import views as v

app_name = 'cadastro'

router = routers.DefaultRouter()
router.register('setor', v.SetorViewSet)

urlpatterns = [
    path('', v.imovel_list, name='imovel_list'),
    path('api/', include(router.urls)),

]
