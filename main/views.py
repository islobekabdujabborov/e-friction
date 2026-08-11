from django.shortcuts import render
from .models import Product, Certificate


def home(request):
    products = Product.objects.all()
    certificates = Certificate.objects.all()
    return render(request, 'main/home.html', {
        'products': products,
        'certificates': certificates,
    })
