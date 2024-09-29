const db = require("../config/db");

class LocationRepository {
  async createLocation(data) {
    const [result] = await db.execute(
      "INSERT INTO locations (name, address, description, longitude, latitude, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        data.name,
        data.address,
        data.description,
        data.longitude,
        data.latitude,
        data.userId,
        data.categoryId,
      ]
    );
    return result;
  }

  async updateLocation(id, data) {
    // Check if the Location exists
    const location = await LocationRepository.findLocationById(id);
    if (!location) {
      throw new Error("Location not found");
    }

    // Check if the User exists
    if (data.userId) {
      const user = await UserRepository.findUserById(data.userId);
      if (!user) {
        throw new Error("User not found");
      }
    }

    // Check if the Category exists
    if (data.categoryId) {
      const category = await CategoryRepository.findCategoryById(
        data.categoryId
      );
      if (!category) {
        throw new Error("Category not found");
      }
    }

    // Proceed to update the location
    const result = await db.execute(
      "UPDATE locations SET name = ?, address = ?, description = ?, longitude = ?, latitude = ?, user_id = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [
        data.name,
        data.address,
        data.description,
        data.longitude,
        data.latitude,
        data.userId,
        data.categoryId,
        id,
      ]
    );
    return result;
  }

  async findLocationById(id) {
    const [rows] = await db.execute("SELECT * FROM locations WHERE id = ?", [
      id,
    ]);
    return rows.length > 0 ? rows[0] : null;
  }

  async findAllLocations() {
    const [rows] = await db.execute("SELECT * FROM locations");
    return rows;
  }

  async deleteLocation(id) {
    const result = await db.execute("DELETE FROM locations WHERE id = ?", [id]);
    return result;
  }
}

module.exports = new LocationRepository();
