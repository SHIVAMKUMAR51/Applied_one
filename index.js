const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for tasks
let tasks = [];

// Route to get all tasks
app.get('/tasks', (req, res) => {
 res.json(tasks);
});

// Route to create a new task
app.post('/tasks', (req, res) => {
 const task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false
 };
 tasks.push(task);
 res.status(201).json(task);
});

// Route to update a task by ID
app.put('/tasks/:id', (req, res) => {
 const task = tasks.find(t => t.id === parseInt(req.params.id));
 if (!task) return res.status(404).send('The task with the given ID was not found.');

 task.title = req.body.title;
 task.description = req.body.description;
 task.completed = req.body.completed;

 res.json(task);
});

// Route to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
 const task = tasks.find(t => t.id === parseInt(req.params.id));
 if (!task) return res.status(404).send('The task with the given ID was not found.');

 const index = tasks.indexOf(task);
 tasks.splice(index, 1);

 res.json(task);
});

// Start the server
app.listen(port, () => {
 console.log(`Task management backend server is running at http://localhost:${port}`);
});