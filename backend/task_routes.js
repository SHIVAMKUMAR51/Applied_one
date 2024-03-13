// task_routes.js

const express = require('express');
const router = express.Router();
const taskModule = require('./task_operations');

// Route to get all tasks
router.get('/tasks', async (req, res) => {
   try {
      const tasks = await taskModule.getAllTasks();
      res.json(tasks);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
   }
});

// Route to get all completed tasks
router.get('/tasks/completed', async (req, res) => {
   try {
      const completedTasks = await taskModule.getCompletedTasks();
      res.json(completedTasks);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve completed tasks', error: error.message });
   }
});

// Route to get a single task by ID
router.get('/tasks/:id', async (req, res) => {
   try {
      const id = parseInt(req.params.id);
      const task = await taskModule.getTaskById(id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve task', error: error.message });
   }
});

// Route to create a new task
router.post('/tasks', async (req, res) => {
   try {
      const task = req.body;
      const result = await taskModule.createTask(task);
      res.status(201).json({ message: 'Task created successfully', id: result });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create task', error: error.message });
   }
});

// Route to update a task by ID
router.put('/tasks/:id', async (req, res) => {
   try {
      const id = parseInt(req.params.id);
      const updatedTask = req.body;
      const result = await taskModule.updateTask(id, updatedTask);
      if (result) {
        res.status(200).json({ message: 'Task updated successfully' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update task', error: error.message });
   }
});

// Route to delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
   try {
      const id = parseInt(req.params.id);
      const result = await taskModule.deleteTask(id);
      if (result) {
        res.status(204).end(); // No Content
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete task', error: error.message });
   }
});

module.exports = router;