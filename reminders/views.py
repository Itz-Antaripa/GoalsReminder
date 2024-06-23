from django.shortcuts import render, redirect, get_object_or_404
from .models import Task
from .forms import TaskForm
from django.views.decorators.http import require_POST


def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def monthly_reminder(request):
    tasks = Task.objects.all().order_by('category', '-created_at')
    form = TaskForm()
    categories = Task.CATEGORY_CHOICES
    return render(request, 'monthly_reminder.html', {
        'tasks': tasks, 
        'form': form, 
        'categories': categories
    })

@require_POST
def add_task(request):
    form = TaskForm(request.POST)
    if form.is_valid():
        task = form.save(commit=False)
        task_date = request.POST.get('task_date')
        if task_date:
            task.due_date = task_date
        task.save()
    return redirect('monthly_reminder')

@require_POST
def toggle_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.is_completed = not task.is_completed
    task.save()
    return redirect('monthly_reminder')

@require_POST
def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.delete()
    return redirect('monthly_reminder')