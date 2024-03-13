require('dotenv').config();

const express = require('express');
const taskModule = require('./tasks');
const errorHandler = require('./errorHandler');
const routes = require('./routes'); // Import the routes
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the imported routes
app.use('/', routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
 console.log(`Task management backend server is running at http://localhost:${port}`);
});