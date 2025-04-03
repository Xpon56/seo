from django.urls import path
from . import views

urlpatterns = [
    path('leads/', views.lead_list, name='lead_list'),
]