from django.urls import path

from . import views as v

app_name = 'seguranca'

urlpatterns = [
    path('login/', v.login, name='login'),
    path('logout/', v.logout, name='logout'),
]
