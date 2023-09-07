from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic

from . import models


class LoteListView(LoginRequiredMixin, generic.ListView):
    model = models.Lote
    paginate_by = 12


lote_list = LoteListView.as_view()
