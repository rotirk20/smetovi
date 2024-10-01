const db = require("../config/db");

class ContactRepository {
  async createMessage(data) {
    const [result] = await db.execute(
      "INSERT INTO contacts (name, contactInfo, subject, message, createdAt) VALUES (?, ?, ?, ?, ?)",
      [data.name, data.contactInfo, data.subject, data.message, new Date()]
    );
    return result;
  }

  async findAllMessages() {
    const [rows] = await db.execute("SELECT * FROM contacts");
    return rows;
  }

  async findMessageById(id) {
    const [rows] = await db.execute("SELECT * FROM contacts WHERE id = ?", [
      id,
    ]);
    return rows.length > 0 ? rows[0] : null;
  }
}

module.exports = new ContactRepository();
