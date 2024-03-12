require('dotenv').config();

const express = require('express');
const taskModule = require('./tasks');
const errorHandler = require('./errorHandler');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Error handling middleware
app.use(errorHandler);

// Route to get all tasks
app.get('/tasks', (req, res) => {
 res.json(taskModule.getAllTasks());
});

// Route to create a new task
app.post('/tasks', (req, res, next) => {
 try {
    const task = taskModule.createTask(req.body);
    res.status(201).json(task);
 } catch (error) {
    next(error);
 }
});

// Route to update a task by ID
app.put('/tasks/:id', (req, res) => {
 try {
    const task = taskModule.updateTask(parseInt(req.params.id), req.body);
    res.json(task);
 } catch (error) {
   next(error);
 }
});

// Route to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
 try {
    const task = taskModule.deleteTask(parseInt(req.params.id));
    res.json(task);
 } catch (error) {
   next(error);
 }
});

// Start the server
app.listen(port, () => {
 console.log(`Task management backend server is running at http://localhost:${port}`);
});
