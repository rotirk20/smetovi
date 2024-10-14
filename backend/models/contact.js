const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Contact = sequelize.define(
  "Contact",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    contactInfo: { type: DataTypes.STRING, allowNull: false, unique: true },
    subject: { type: DataTypes.STRING, allowNull: false, unique: true },
    message: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { timestamps: true }
);

module.exports = Contact;
