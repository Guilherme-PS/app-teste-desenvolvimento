from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import json

# Create your views here.
def home(requests):
    return render(requests, "home/home.html")

@ensure_csrf_cookie
def get_message(request):
    if request.method == "POST":
        data = json.loads(request.body);

        return JsonResponse({"status": "success"})

    return JsonResponse({"status": "error"}, status=400)