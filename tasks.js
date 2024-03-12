// task.js

let tasks = [];

function validateTask(task) {
 if (!task.title) {
    return 'Title is required.';
 }
 // Add more validation rules as needed
 return null;
}

function getAllTasks() {
 return tasks;
}

function createTask(task) {
 const error = validateTask(task);
 if (error) throw new Error(error);

 const newTask = {
    id: tasks.length + 1,
    title: task.title,
    description: task.description,
    completed: false
 };
 tasks.push(newTask);
 return newTask;
}

function updateTask(id, updatedTask) {
 const task = tasks.find(t => t.id === id);
 if (!task) throw new Error('The task with the given ID was not found.');

 const error = validateTask(updatedTask);
 if (error) throw new Error(error);

 task.title = updatedTask.title;
 task.description = updatedTask.description;
 task.completed = updatedTask.completed;

 return task;
}

function deleteTask(id) {
 const task = tasks.find(t => t.id === id);
 if (!task) throw new Error('The task with the given ID was not found.');

 const index = tasks.indexOf(task);
 tasks.splice(index, 1);

 return task;
}

function getCompletedTasks() {
 return tasks.filter(task => task.completed);
}

module.exports = {
 getAllTasks,
 createTask,
 updateTask,
 deleteTask,
 getCompletedTasks
};