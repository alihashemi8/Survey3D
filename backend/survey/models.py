from django.db import models

class SurveyResponse(models.Model):
    step1 = models.JSONField()
    step2 = models.JSONField()
    step3 = models.JSONField()
    step4 = models.JSONField()
    step5 = models.JSONField()
    step6 = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Survey #{self.id}"
