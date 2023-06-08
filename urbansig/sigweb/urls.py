from django.urls import path

from . import views as v

app_name = 'sigweb'

urlpatterns = [
    path('', v.mapa, name='mapa'),
]
