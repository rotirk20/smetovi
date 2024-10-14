const { Location, User, Category } = require('../models');

// Get all locations
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'], // Exclude password
        },
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get location by ID
const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'], // Exclude password
        },
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get locations by user
const getLocationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const locations = await Location.findAll({
      where: { UserId: userId },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'], // Exclude password
        },
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get locations by category
const getLocationsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const locations = await Location.findAll({
      where: { CategoryId: categoryId },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'], // Exclude password
        },
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new location
const createLocation = async (req, res) => {
  const { name, address, description, longitude, latitude, image, CategoryId } = req.body;
  const userId = req.user.id; // Assuming the user ID is available in the request object

  try {
    // Check if the category exists
    const category = await Category.findByPk(CategoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Create the location
    const location = await Location.create({
      name,
      address,
      description,
      longitude,
      latitude,
      image,
      CategoryId,
      UserId: userId,
    });

    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update location
const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, address, description, longitude, latitude, image, CategoryId } = req.body;
  try {
    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    await location.update({ name, address, description, longitude, latitude, image, CategoryId });
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete location
const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    await location.destroy();
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  getLocationsByUser,
  getLocationsByCategory,
  updateLocation,
  deleteLocation,
  createLocation
};