from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('urbansig.core.urls')),
    path('cadastro/', include('urbansig.cadastro.urls')),
    path('mapa/', include('urbansig.sigweb.urls')),
    path('seguranca/', include('urbansig.seguranca.urls')),
    path('admin/', admin.site.urls),
]
