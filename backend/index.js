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
app.get('/tasks', async (req, res) => {
   try {
      const tasks = await taskModule.getAllTasks();
      res.json(tasks);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
   }
});

// Route to get all completed tasks
app.get('/tasks/completed', async (req, res) => {
   try {
      const completedTasks = await taskModule.getCompletedTasks();
      res.json(completedTasks);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve completed tasks', error: error.message });
   }
   });

// Route to get a single task by ID
app.get('/tasks/:id', async (req, res) => {
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
app.post('/tasks', async (req, res) => {
   try {
      const task = req.body;
      const result = await taskModule.createTask(task);
      // If the operation was successful, send a 201 Created response
      res.status(201).json({ message: 'Task created successfully', id: result });
   } catch (error) {
      // If an error occurred, send a 500 Internal Server Error response
      console.error(error);
      res.status(500).json({ message: 'Failed to create task', error: error.message });
   }
  });

// Route to update a task by ID
app.put('/tasks/:id', async (req, res) => {
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
app.delete('/tasks/:id', async (req, res) => {
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

// Start the server
app.listen(port, () => {
 console.log(`Task management backend server is running at http://localhost:${port}`);
});
