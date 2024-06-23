from django.db import models

class Task(models.Model):
    CATEGORY_CHOICES = [
        ('earlier', 'Earlier'),
        ('today', 'Today'),
        ('tomorrow', 'Tomorrow'),
    ]
    
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    is_completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
