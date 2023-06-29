from rest_framework import serializers

from . import models


class SetorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Setor
        fields = ['id', 'num_setor', 'bounds']
