const app = document.getElementById('app');

// State to manage tasks
let tasks = [];

// Function to render the task list
function renderTasks() {
  const taskList = document.createElement('ul');
  taskList.className = 'task-list';
  
  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
      <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} />
      <label for="${task.id}">${task.text}</label>
      <button>Delete</button>
    `;
    
    // Add event listener for checkbox change
    taskItem.querySelector('input').addEventListener('change', () => {
      const taskId = parseInt(taskItem.querySelector('input').id, 10);
      toggleTaskCompletion(taskId);
    });
    
    // Add event listener for delete button click
    taskItem.querySelector('button').addEventListener('click', () => {
      const taskId = parseInt(taskItem.querySelector('input').id, 10);
      deleteTask(taskId);
    });
    
    taskList.appendChild(taskItem);
  });
  
  app.innerHTML = '';
  app.appendChild(taskList);
}

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('task-input');
  const newTask = {
    id: Date.now(),
    text: taskInput.value,
    completed: false,
  };
  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task));
  renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

// Initial render
renderTasks();

// Add event listener for form submission (assuming you have a form with an input)
// document.getElementById('task-form').addEventListener('submit', (event) => {
//   event.preventDefault();
//   addTask();
// });
document.getElementById('task-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    if (taskInput.value.trim() !== '') {
      addTask(); // Call the addTask function
    }
    taskInput.value = ''; // Clear the input field
  });