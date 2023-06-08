from django.shortcuts import render


def imovel_list(request):
    return render(request, 'cadastro/imovel_list.html')
