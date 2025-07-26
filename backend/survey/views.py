import os
import json
import requests
from dotenv import load_dotenv
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import re
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENAI_API_KEY")
print("🔑 OPENROUTER_API_KEY:", OPENROUTER_API_KEY)

@api_view(['POST'])
def submit_results(request):
    data = request.data
    print("✅ نتایج دریافت شد:", data)
    return Response({"message": "نتایج با موفقیت دریافت شد"})

@csrf_exempt
def chatgpt_analysis(request):
    if request.method == "POST":
        print("📥 request.body.decode():", request.body.decode('utf-8'))

        try:
            body = json.loads(request.body)
            user_prompt = f"""با توجه به اطلاعات زیر یک تحلیل شغلی کامل بده. خروجی باید شامل این بخش‌ها باشه:
- تحلیل کلی
- نقشه راه مهارتی
- مزایا
- معایب
- پیشنهادهای یادگیری

اطلاعات کاربر:
{json.dumps(body, ensure_ascii=False, indent=2)}
"""

            response = requests.post(
                url="https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "gpt-4o-mini",
                    "messages": [
                        {"role": "system", "content": "شما یک مشاور مسیر شغلی هستید."},
                        {"role": "user", "content": user_prompt},
                    ],
                },
            )

            result = response.json()
            ai_message = result["choices"][0]["message"]["content"]

            # 🔍 پارس کردن خروجی با Regex (بسته به فرمت تولیدشده توسط مدل ممکنه نیاز به تنظیم داشته باشه)
            def extract_section(text, title):
                pattern = rf"{title}[:：]\s*(.*?)(?=\n[A-Zآ-ی]{2,}|$)"
                match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
                return match.group(1).strip() if match else ""

            return JsonResponse({
                "detailed_analysis": extract_section(ai_message, "تحلیل کلی"),
                "skill_roadmap": extract_section(ai_message, "نقشه راه"),
                "pros_and_cons": {
                    "pros": extract_section(ai_message, "مزایا").split("\n"),
                    "cons": extract_section(ai_message, "معایب").split("\n"),
                },
                "learning_suggestions": extract_section(ai_message, "پیشنهادهای یادگیری"),
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Only POST method allowed"}, status=405)