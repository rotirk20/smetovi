const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Initialize database and tables
const initDB = () => {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL!");

    // Create database if it doesn't exist
    connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`,
      (err) => {
        if (err) throw err;
        console.log(`Database ${process.env.DB_NAME} checked/created`);

        // Use the created or existing database
        connection.changeUser({ database: process.env.DB_NAME }, (err) => {
          if (err) throw err;

          // Create tables
          createTables();
        });
      }
    );
  });
};

const createTables = () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  const categoryTable = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  const locationTable = `
    CREATE TABLE IF NOT EXISTS locations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      description TEXT,
      longitude DECIMAL(9,6),
      latitude DECIMAL(9,6),
      user_id INT,
      category_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    );
  `;

  const contactTable = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(63) NOT NULL,
      contactInfo VARCHAR(63), -- Email is optional
      subject VARCHAR(127) NOT NULL,
      message VARCHAR(255) NOT NULL, -- Message length is now 255 characters
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  connection.query(userTable, (err) => {
    if (err) throw err;
    console.log("User table checked/created");
  });

  connection.query(categoryTable, (err) => {
    if (err) throw err;
    console.log("Category table checked/created");
  });

  connection.query(locationTable, (err) => {
    if (err) throw err;
    console.log("Location table checked/created");
  });

  // Create contact table if needed
  // connection.query(contactTable, (err) => {
  //   if (err) throw err;
  //   console.log("Contact table checked/created");
  // });
};

module.exports = initDB;
