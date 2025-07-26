from django.urls import path
from .views import chatgpt_analysis, submit_results

urlpatterns = [
    path('chatgpt_analysis/', chatgpt_analysis),
    path('submit/', submit_results),
]
