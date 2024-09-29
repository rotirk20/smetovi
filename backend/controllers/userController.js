const UserService = require("../services/userService");

exports.register = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    await UserService.updateUser(req.params.id, req.body);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
