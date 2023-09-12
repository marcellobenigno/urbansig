from django import forms
from leaflet.forms.widgets import LeafletWidget

from . import models


class LoteMapWidget(LeafletWidget):
    geometry_field_class = 'LoteGeometryField'


class LoteForm(forms.ModelForm):
    class Meta:
        model = models.Lote
        fields = [
            'num_lote',
            'situacao',
            'quadra',
            'geom',
        ]
        widgets = {'geom': LoteMapWidget()}
