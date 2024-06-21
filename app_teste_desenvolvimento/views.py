from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from openai import OpenAI
import os
from dotenv import load_dotenv
import json

# Create your views here.
def home(requests):
    return render(requests, "home/home.html")

@ensure_csrf_cookie
def get_message(request):
    if request.method == "POST":
        load_dotenv()

        client = OpenAI(api_key=os.environ.get("OPENAI_KEY"))

        data = json.loads(request.body);
        message = data.get("message", "")

        try:
            completion = client.chat.completions.create(
               model="gpt-3.5-turbo-1106",
               response_format={ "type": "json_object" },
               messages=[
                   {"role": "system", "content": """
                       Você é um assistente que responde às perguntas do usuário.
                      Você deve retornar apenas o JSON com o nome "answer" e o valor a resposta da pergunta.
                   """},
                   {"role": "user", "content": message}
               ]
            )

            answer = json.loads(completion.choices[0].message.content)
        except:
            answer = {"answer" : "Pergunta Não Enviada!"}

        finally:
            return JsonResponse(answer)

    return JsonResponse({"status": "error"}, status=400)
