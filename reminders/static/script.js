
document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task-button');
    const addTaskModal = document.getElementById('add-task-modal');
    const editTaskModal = document.getElementById('edit-task-modal');
    const addTaskForm = document.getElementById('add-task-form');
    const categorySelect = document.getElementById('task_category');
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

    addTaskButton.addEventListener('click', function() {
        addTaskModal.style.display = 'block';
        updateAddTaskForm();
    });

    addTaskModal.addEventListener('click', function(e) {
        if (e.target === addTaskModal) {
            addTaskModal.style.display = 'none';
        }
    });

    editTaskModal.addEventListener('click', function(e) {
        if (e.target === editTaskModal) {
            editTaskModal.style.display = 'none';
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
});

function openEditForm(taskId, title, category, dueDate) {
    document.getElementById('edit-task-title').value = title;
    document.getElementById('edit-task-category').value = category;
    document.getElementById('edit-task-date').value = dueDate;
    document.getElementById('edit-task-form').action = `/edit_task/${taskId}/`;
    document.getElementById('edit-task-modal').style.display = 'block';
}