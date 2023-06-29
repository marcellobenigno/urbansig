from django.contrib.gis.geos import GEOSGeometry
from django.shortcuts import render

from ..cadastro.models import Lote


def mapa(request):
    return render(request, 'sigweb/mapa.html')


def click_map(request, lng, lat):
    pnt = GEOSGeometry(f'POINT({lng} {lat})', srid=4326)
    lote = Lote.objects.filter(geom__contains=pnt).first()

    context = {
        'lote': lote,
        'lng': lng,
        'lat': lat,
    }
    return render(request, 'sigweb/click_map.html', context)
