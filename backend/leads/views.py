from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Lead
import json

from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def services(request):
    return render(request, 'index.html')

def contacts(request):
    return render(request, 'index.html')

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Lead

@login_required
def lead_list(request):
    leads = Lead.objects.all().order_by('-created_at')
    return render(request, 'leads/lead_list.html', {'leads': leads})

@csrf_exempt
def create_lead(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Lead.objects.create(
                name=data.get('name'),
                phone=data.get('phone'),
                email=data.get('email'),
                service=data.get('service'),
                message=data.get('message', '')
            )
            return JsonResponse({'message': 'Заявка успешно сохранена!'}, status=201)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)
    return JsonResponse({'message': 'Метод не разрешен'}, status=405)