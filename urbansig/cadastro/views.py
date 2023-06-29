from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from . import models, serializers


def imovel_list(request):
    return render(request, 'cadastro/imovel_list.html')


class SetorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Setor.objects.all()
    serializer_class = serializers.SetorSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('id', 'num_setor',)
