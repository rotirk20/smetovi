const db = require("../config/db");

class CategoryRepository {
  async createCategory(data) {
    const [result] = await db.execute(
      "INSERT INTO categories (name, description) VALUES (?, ?)",
      [data.name, data.description]
    );
    return result;
  }

  async findCategoryById(id) {
    const [rows] = await db.execute("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  async findAllCategories() {
    const [rows] = await db.execute("SELECT * FROM categories");
    return rows;
  }

  async updateCategory(id, data) {
    const result = await db.execute(
      "UPDATE categories SET name = ?, description = ? WHERE id = ?",
      [data.name, data.description, id]
    );
    return result;
  }

  async deleteCategory(id) {
    const result = await db.execute("DELETE FROM categories WHERE id = ?", [
      id,
    ]);
    return result;
  }
}

module.exports = new CategoryRepository();
