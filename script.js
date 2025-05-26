document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
                <span>${task.text}</span>
                <button class="deleteBtn">Excluir</button>
            `;
            if (task.completed) li.classList.add('completed');
            taskList.appendChild(li);

            // Marcar tarefa como concluída
            li.querySelector('.checkbox').addEventListener('change', () => {
                tasks[idx].completed = !tasks[idx].completed;
                saveTasks();
                renderTasks();
            });

            // Excluir tarefa
            li.querySelector('.deleteBtn').addEventListener('click', () => {
                tasks.splice(idx, 1);
                saveTasks();
                renderTasks();
            });
        });
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    renderTasks();
});
