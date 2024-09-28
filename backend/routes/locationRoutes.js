const express = require('express');
const { getAllLocations, addLocation } = require('../controllers/locationsController');
const router = express.Router();

// Route to get all locations
router.get('/', getAllLocations);

// Route to add a new location
// router.post('/', addLocation);

module.exports = router;