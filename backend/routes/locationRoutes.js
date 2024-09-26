import express from 'express';
import { getAllLocations, addLocation } from '../controllers/locationsController.js';

const router = express.Router();

// Route to get all locations
router.get('/', getAllLocations);

// Route to add a new location
router.post('/', addLocation);

export default router;