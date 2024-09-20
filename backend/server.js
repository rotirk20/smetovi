require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = process.env.DB_PORT || 4000;

// MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Determine if the environment is production or development
const frontendPath = process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../../public_html') // For cPanel (production)
    : path.join(__dirname, '../frontend/dist/smetovi'); // For local development

// Serve the Angular frontend
app.use(express.static(path.join(__dirname, '../frontend/dist/smetovi')));

// API endpoint example
app.get('/api/data', (req, res) => {
    db.query('SELECT * FROM locations', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Handle Angular routes
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
