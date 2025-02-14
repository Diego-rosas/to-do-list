document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Função para adicionar tarefa
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
      }
    });
  
    // Função para adicionar tarefa na lista
    function addTask(taskText) {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" class="checkbox"/>
        <span>${taskText}</span>
        <button class="deleteBtn">Excluir</button>
      `;
      taskList.appendChild(li);
  
      // Marcar tarefa como concluída
      li.querySelector('.checkbox').addEventListener('click', () => {
        li.classList.toggle('completed');
      });
  
      // Excluir tarefa
      li.querySelector('.deleteBtn').addEventListener('click', () => {
        li.remove();
      });
    }
  
    // Adicionar tarefa ao pressionar Enter
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTaskBtn.click();
      }
    });
  });