from django.contrib import admin
from django.urls import path
from survey import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/submit-survey/', views.submit_survey),
    path('api/result/<int:id>/', views.get_result),
    path('api/path-details/<str:path>/', views.get_path_details),
]
