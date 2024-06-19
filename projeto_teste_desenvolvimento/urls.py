from django.urls import path
from app_teste_desenvolvimento import views

urlpatterns = [
    path("", views.home, name="home"),
]
