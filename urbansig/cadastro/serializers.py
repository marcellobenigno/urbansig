from rest_framework_gis.serializers import GeoFeatureModelSerializer

from . import models


class SetorSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.Setor
        geo_field = 'geom'

        fields = ['id', 'num_setor', 'bounds']
