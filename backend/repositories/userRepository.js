const db = require("../config/db");

class UserRepository {
  async createUser(data) {
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [data.name, data.email, data.password]
    );
    return result;
  }

  async findUserById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  async findUserByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows.length > 0 ? rows[0] : null;
  }

  async findAllUsers() {
    const [rows] = await db.execute("SELECT * FROM users");
    return rows;
  }

  async updateUser(id, data) {
    const result = await db.execute(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [data.name, data.email, data.password, id]
    );
    return result;
  }

  async deleteUser(id) {
    const result = await db.execute("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
}

module.exports = new UserRepository();
