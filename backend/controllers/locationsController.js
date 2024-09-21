const db = require('../config/db');

// Get all locations
const getAllLocations = (req, res) => {
    db.query('SELECT * FROM locations', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Add a new location
const addLocation = (req, res) => {
    const { name, latitude, longitude } = req.body;
    if (!name || !latitude || !longitude) {
        return res.status(400).json({ message: 'Please provide name, latitude, and longitude' });
    }
    const query = 'INSERT INTO locations (name, latitude, longitude) VALUES (?, ?, ?)';
    db.query(query, [name, latitude, longitude], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Location added successfully', locationId: results.insertId });
    });
};

module.exports = { getAllLocations, addLocation };
