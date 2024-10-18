const User = require('./user');
const Location = require('./location');
const Category = require('./category');
const RefreshToken = require('./refreshToken');
const Contact = require('./contact');

const initModels = async () => {
  await User.sync();
  await Category.sync();
  await Location.sync();
  await RefreshToken.sync();
  await Contact.sync();
};

module.exports = { User, Location, Category, RefreshToken, Contact, initModels };