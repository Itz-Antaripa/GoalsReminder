function openEditForm(taskId, title, category, dueDate) {
    document.getElementById('edit-task-title').value = title;
    document.getElementById('edit-task-category').value = category;
    document.getElementById('edit-task-date').value = dueDate;
    document.getElementById('edit-task-form').action = `/edit_task/${taskId}/`;
    document.getElementById('edit-task-modal').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task-button');
    const addTaskForm = document.getElementById('add-task-form');
    const categorySelect = document.getElementById('id_category');
    const taskDateInput = document.getElementById('task_date');

    function updateAddTaskForm() {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        taskDateInput.value = today;
        taskDateInput.min = today;

        const dayOfWeek = now.getDay();
        const hour = now.getHours();

        let category;

        if (dayOfWeek === 0 || (dayOfWeek === 6 && hour >= 18)) {
            category = 'sunday';
        } else if (hour >= 18) {
            category = 'tomorrow';
        } else {
            category = 'today';
        }

        categorySelect.value = category;
    }

    updateAddTaskForm();

    // Update to handle toggling of 'hidden' class and updating form
    addTaskButton.addEventListener('click', function() {
        addTaskForm.classList.toggle('hidden');
        updateAddTaskForm();
        
        // Scroll to the bottom of the card when the form is shown
        if (!addTaskForm.classList.contains('hidden')) {
            addTaskForm.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    });

    taskDateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getDay();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let category;

        if (selectedDate.getTime() === today.getTime()) {
            category = 'today';
        } else if (selectedDate.getTime() === today.getTime() + 86400000) {
            category = 'tomorrow';
        } else {
            category = 'earlier';
        }

        categorySelect.value = category;
    });

    const editTaskModal = document.getElementById('edit-task-modal');
    
    editTaskModal.addEventListener('click', function(e) {
        if (e.target === editTaskModal) {
            editTaskModal.classList.add('hidden');
        }
    });
});