import mysql from 'mysql2/promise';
import sequelize from '../config/database.js';
import { User, Category, Location } from '../models/index.js';

export async function initializeDatabase() {
  try {
    const { host, username: user, password, database } = sequelize.config;

    // Create a connection to MySQL server without specifying a database
    const connection = await mysql.createConnection({ host, user, password });

    // Check if the database exists
    const [rows] = await connection.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${database}'`
    );

    if (rows.length === 0) {
      // Database doesn't exist, create it
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
      console.log('Database created.');
    } else {
      console.log('Database already exists.');
    }

    // Close the MySQL connection
    await connection.end();

    // Now connect to the database using Sequelize
    await sequelize.authenticate();
    console.log('Sequelize connection has been established successfully.');

    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to initialize the database:', error);
    throw error;
  }
}

