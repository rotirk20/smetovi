const mysql = require('mysql');

// Create the connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database and create tables if they don't exist
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');

    // SQL for checking and creating tables
    const queries = [
        `CREATE TABLE IF NOT EXISTS locationTypes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            typeName VARCHAR(255) NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
        );`,
        `CREATE TABLE IF NOT EXISTS locations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            locationName VARCHAR(255) NOT NULL,
            locationTypeId INT,
            userId INT,
            longitude FLOAT,
            latitude FLOAT,
            image VARCHAR(255),
            FOREIGN KEY (locationTypeId) REFERENCES locationTypes(id),
            FOREIGN KEY (userId) REFERENCES users(id)
        );`,
        `CREATE TABLE IF NOT EXISTS user_locations (
            userId INT,
            locationId INT,
            PRIMARY KEY (userId, locationId),
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (locationId) REFERENCES locations(id)
        );`
    ];

    // Loop through each query to create tables
    queries.forEach((query) => {
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error creating table:', error);
            } else {
                console.log('Table checked/created successfully.');
            }
        });
    });
});

module.exports = db;
