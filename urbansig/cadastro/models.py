from django.contrib.gis.db import models

from urbansig.core.models import BaseModel


class Setor(BaseModel):
    num_setor = models.CharField('Número do Setor', unique=True, max_length=20)
    geom = models.MultiPolygonField('Geometria', srid=4326)

    def __str__(self):
        return self.num_setor

    class Meta:
        verbose_name = 'Setor'
        verbose_name_plural = 'Setores'


class Quadra(BaseModel):
    num_quadra = models.CharField('Número da Quadra', max_length=20)
    setor = models.ForeignKey('Setor', verbose_name='setor', on_delete=models.PROTECT)
    geom = models.MultiPolygonField('Geometria', srid=4326)

    def __str__(self):
        return self.num_quadra

    class Meta:
        verbose_name = 'Quadra'
        verbose_name_plural = 'Quadras'


class Lote(BaseModel):
    SITUACAO_CHOICES = (
        ('a-ser-atendido', 'A ser atendido'),
        ('lote-cadastrado', 'Lote cadastrado'),
        ('lote-titulado', 'Lote titulado'),
    )
    num_lote = models.CharField('Número do Lote', max_length=20)
    situacao = models.CharField('Situação', max_length=20, choices=SITUACAO_CHOICES)
    quadra = models.ForeignKey('Quadra', verbose_name='quadra', on_delete=models.PROTECT)
    geom = models.MultiPolygonField('Geometria', srid=4326)

    def __str__(self):
        return self.num_lote

    class Meta:
        verbose_name = 'Lote'
        verbose_name_plural = 'Lotes'
