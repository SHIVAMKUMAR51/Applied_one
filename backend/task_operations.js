// task_operations.js

const pool = require('./db');

function validateTask(task) {
 if (!task.title) {
    return 'Title is required.';
 }
 return null;
}

function getAllTasks() {
 return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tasks';
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
 });
}

function getTaskById(id) {
  return new Promise((resolve, reject) => {
     const query = 'SELECT * FROM tasks WHERE id = ?';
     pool.query(query, [id], (error, results) => {
       if (error) {
         reject(error);
       } else {
         resolve(results[0]);
       }
     });
  });
 }

function createTask(task) {
 return new Promise((resolve, reject) => {
    const query = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)';
    pool.query(query, [task.title, task.description, task.completed], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
 });
}

function updateTask(id, updatedTask) {
 return new Promise((resolve, reject) => {
    const query = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
    pool.query(query, [updatedTask.title, updatedTask.description, updatedTask.completed, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
 });
}

function deleteTask(id) {
 return new Promise((resolve, reject) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    pool.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
 });
}

function getCompletedTasks() {
 return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tasks WHERE completed = 1';
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
 });
}

module.exports = {
 getAllTasks,
 createTask,
 updateTask,
 deleteTask,
 getCompletedTasks,
 getTaskById
};
