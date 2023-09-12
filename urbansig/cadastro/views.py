from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views import generic

from . import forms
from . import models


class LoteListView(LoginRequiredMixin, generic.ListView):
    model = models.Lote
    paginate_by = 12


class LoteCreateView(LoginRequiredMixin, generic.CreateView):
    form_class = forms.LoteForm
    template_name = 'cadastro/lote_form.html'

    def get_success_url(self):
        messages.success(self.request, 'Lote criado com sucesso!')
        return reverse('cadastro:lote_list')


lote_list = LoteListView.as_view()
lote_create = LoteCreateView.as_view()
