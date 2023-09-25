from django import forms
from django.core.exceptions import ValidationError
from leaflet.forms.widgets import LeafletWidget

from . import models


class LoteMapWidget(LeafletWidget):
    geometry_field_class = 'LoteGeometryField'


def get_quadra(geom):
    return models.Quadra.objects.filter(
        geom__intersects=geom
    ).first()


class LoteForm(forms.ModelForm):

    def clean_geom(self):
        lote_geom = self.cleaned_data.get('geom')

        if not get_quadra(lote_geom):
            raise ValidationError(
                'O lote deve ser criado dentro de uma quadra!'
            )

        return lote_geom

    def save(self, commit=True):
        lote = super().save(commit=False)
        lote.quadra = get_quadra(self.cleaned_data.get('geom'))
        if commit:
            lote.save()
        return lote

    class Meta:
        model = models.Lote
        fields = [
            'num_lote',
            'situacao',
            'geom',
        ]
        widgets = {'geom': LoteMapWidget()}
