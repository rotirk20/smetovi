const CategoryRepository = require("../repositories/categoryRepository");
const Category = require("../models/category");

class CategoryService {
  async createCategory(data) {
    const result = await CategoryRepository.createCategory(data);
    return new Category(
      result.insertId,
      data.name,
      data.description,
      new Date(),
      new Date()
    );
  }

  async getCategoryById(id) {
    const category = await CategoryRepository.findCategoryById(id);
    if (!category) throw new Error("Category not found");
    return category;
  }

  async getAllCategories() {
    return CategoryRepository.findAllCategories();
  }

  async updateCategory(id, data) {
    return CategoryRepository.updateCategory(id, data);
  }

  async deleteCategory(id) {
    return CategoryRepository.deleteCategory(id);
  }
}

module.exports = new CategoryService();
