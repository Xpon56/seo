from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'service', 'created_at')
    search_fields = ('name', 'phone', 'email')
    list_filter = ('created_at', 'service')
    date_hierarchy = 'created_at'