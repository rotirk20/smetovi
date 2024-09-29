const CategoryService = require("../services/categoryService");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    await CategoryService.updateCategory(req.params.id, req.body);
    res.status(200).json({ message: "Category updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await CategoryService.deleteCategory(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};
