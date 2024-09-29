const LocationRepository = require("../repositories/locationRepository");
const UserRepository = require("../repositories/userRepository");
const CategoryRepository = require("../repositories/categoryRepository");
const Location = require("../models/location");

class LocationService {
  async createLocation(data) {
    // Check if the User exists
    const user = await UserRepository.findUserById(data.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the Category exists
    const category = await CategoryRepository.findCategoryById(data.categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    // Proceed to create the location
    const result = await LocationRepository.createLocation(data);
    return new Location(
      result.insertId,
      data.name,
      data.address,
      data.description,
      data.longitude,
      data.latitude,
      data.userId,
      data.categoryId,
      new Date(),
      new Date()
    );
  }

  async updateLocation(id, data) {
    return LocationRepository.updateLocation(id, data);
  }

  async getLocationById(id) {
    const location = await LocationRepository.findLocationById(id);
    if (!location) throw new Error("Location not found");
    return location;
  }

  async getAllLocations() {
    return LocationRepository.findAllLocations();
  }

  async deleteLocation(id) {
    return LocationRepository.deleteLocation(id);
  }
}

module.exports = new LocationService();
