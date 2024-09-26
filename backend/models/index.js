// File: models/index.js
import User from './User.js';
import Category from './Category.js';
import Location from './Location.js';

// Define associations
User.belongsToMany(Location, { through: 'UserLocations' });
Location.belongsToMany(User, { through: 'UserLocations' });

Category.hasMany(Location);

export {
  User,
  Category,
  Location
};