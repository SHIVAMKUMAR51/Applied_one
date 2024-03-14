// const app = document.getElementById('app');

// // State to manage tasks
// let tasks = [];

// // Function to render the task list
// function renderTasks() {
//   const taskList = document.createElement('ul');
//   taskList.className = 'task-list';
  
//   tasks.forEach((task) => {
//     const taskItem = document.createElement('li');
//     taskItem.className = 'task-item';
//     taskItem.innerHTML = `
//       <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} />
//       <label for="${task.id}">${task.text}</label>
//       <button >Delete</button>
//     `;
    
//     // Add event listener for checkbox change
//     taskItem.querySelector('input').addEventListener('change', () => {
//       const taskId = parseInt(taskItem.querySelector('input').id, 10);
//       toggleTaskCompletion(taskId);
//     });
    
//     // Add event listener for delete button click
//     taskItem.querySelector('button').addEventListener('click', () => {
//       const taskId = parseInt(taskItem.querySelector('input').id, 10);
//       deleteTask(taskId);
//     });
    
//     taskList.appendChild(taskItem);
//   });
  
//   app.innerHTML = '';
//   app.appendChild(taskList);
// }

// // Function to add a new task
// function addTask() {
//   const taskInput = document.getElementById('task-input');
//   const newTask = {
//     id: Date.now(),
//     text: taskInput.value,
//     completed: false,
//   };
//   tasks.push(newTask);
//   taskInput.value = '';
//   renderTasks();
// }

// // Function to toggle task completion
// function toggleTaskCompletion(taskId) {
//   tasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task));
//   renderTasks();
// }

// // Function to delete a task
// function deleteTask(taskId) {
//   tasks = tasks.filter((task) => task.id !== taskId);
//   renderTasks();
// }

// // Initial render
// renderTasks();

// // Add event listener for form submission (assuming you have a form with an input)
// // document.getElementById('task-form').addEventListener('submit', (event) => {
// //   event.preventDefault();
// //   addTask();
// // });
// document.getElementById('task-form').addEventListener('submit', (event) => {
//     event.preventDefault();
//     const taskInput = document.getElementById('task-input');
//     if (taskInput.value.trim() !== '') {
//       addTask(); // Call the addTask function
//     }
//     taskInput.value = ''; // Clear the input field
//   });







// function addTask() {
//   var taskInput = document.getElementById('taskInput');
//   var taskList = document.getElementById('taskList');

//   if (taskInput.value.trim() !== '') {
//       var li = document.createElement('li');
//       li.innerHTML = `
//           <span>${taskInput.value}</span>
//           <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
//       `;
//       taskList.appendChild(li);
//       taskInput.value = '';
//   } else {
//       alert('Please enter a task.');
//   }
// }

// function deleteTask(btn) {
//   btn.parentElement.remove();
// }








const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
 
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;
    if (task.trim() === "" || deadline === "") {
        alert("Please select an upcoming date for the deadline.")
        return; // Don't add task if task or deadline is empty
    }
 
    const selectedDate = new Date(deadline);
    const currentDate = new Date();
 
    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return; // Don't add task if deadline is not in the future
    }
 
 
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
    <p>${task}</p>
    <p>Priority: ${priority}</p>
    <p>Deadline: ${deadline}</p>
    <button class="mark-done">Mark Done</button>
  `;
 
    taskList.appendChild(taskItem);
 
    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";
});
 
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "#f2f2f2";
        event.target.disabled = true;
    }
});
