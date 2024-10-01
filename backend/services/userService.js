const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/userRepository");
const User = require("../models/user");

class UserService {
  async loginUser(email, password) {
    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    return user; // Password is correct, return user
  }

  async createUser(data) {
    // Hash the password before storing
    console.log(data);
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds

    const result = await UserRepository.createUser({
      ...data,
      password: hashedPassword, // Save hashed password
    });

    return new User(
      result.insertId,
      data.name,
      data.email,
      hashedPassword,
      new Date(),
      new Date()
    );
  }

  async getUserById(id) {
    const user = await UserRepository.findUserById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async getAllUsers() {
    return UserRepository.findAllUsers();
  }

  async updateUser(id, data) {
    let updateData = { ...data };

    // Check if a new password is provided
    if (data.password) {
      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData.password = hashedPassword;
    }

    // Proceed with updating the user in the database
    const result = await UserRepository.updateUser(id, updateData);

    // Fetch the updated user after the update
    const updatedUser = await UserRepository.findUserById(id);

    // Return the user DTO, excluding the password
    return updatedUser;
  }
}

module.exports = new UserService();
