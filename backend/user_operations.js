// user_operations.js

const pool = require('./db');

// Function to create a new user
function createUser(username, hashedPassword) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        pool.query(query, [username, hashedPassword], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
}

// Function to validate user credentials
function validateUser(username, password) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        pool.query(query, [username], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const user = results[0];
                if (user && bcrypt.compareSync(password, user.password)) {
                    resolve(user);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }
        });
    });
}

module.exports = {
    createUser,
    validateUser
};