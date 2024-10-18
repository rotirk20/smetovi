const express = require('express');
const {
  getAllLocations,
  getLocationById,
  getLocationsByUser,
  getLocationsByCategory,
  updateLocation,
  deleteLocation,
  createLocation,
} = require('../controllers/locationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllLocations);
router.get('/:id', getLocationById);
router.get('/user/:userId', getLocationsByUser);
router.get('/category/:categoryId', getLocationsByCategory);
router.post('/', authMiddleware, createLocation);
router.put('/:id', authMiddleware, updateLocation);
router.delete('/:id', authMiddleware, deleteLocation);

module.exports = router;