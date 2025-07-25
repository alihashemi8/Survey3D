from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SurveyResponse
from .serializers import SurveyResponseSerializer
from .analyze_path import analyze_path   # فقط اگه فایل تحلیل رو بسازی

@api_view(['POST'])
def submit_survey(request):
    serializer = SurveyResponseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'ok', 'id': serializer.data['id']})
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_result(request, id):
    try:
        survey = SurveyResponse.objects.get(id=id)
    except SurveyResponse.DoesNotExist:
        return Response({'error': 'پاسخ پیدا نشد'}, status=404)
    result = analyze_path(survey)  # یا یک تابع ساده اینجا بنویسی
    return Response(result)

@api_view(['GET'])
def get_path_details(request, path):
    details = {
        "ai": {"title": "هوش مصنوعی", "desc": "تحلیل داده، یادگیری ماشین و ..."},
        "web": {"title": "توسعه وب", "desc": "فرانت‌اند، بک‌اند، دیتابیس ..."},
        "game": {"title": "توسعه بازی", "desc": "Unity، Unreal، گرافیک ..."},
    }
    return Response(details.get(path, {'error': 'مسیر پیدا نشد'}))
