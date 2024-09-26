import { Location, User } from '../models/index.js';
import HttpError from '../models/HttpError.js';


// Get all locations
export const getAllLocations = async (req, res) => {
    try {
      const locations = await Location.findAll({
        include: [{ model: Category }, { model: User }]
      });
      res.status(200).json(locations);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a place.',
            500
          );
          return next(error);
    }
  }

// Add a new location
export const addLocation = async (req, res, next) => {
    const { name, description, address, longitude, latitude, CategoryId } = req.body;
  
    try {
      const location = await Location.create({
        name,
        description,
        address,
        longitude, 
        latitude,
        CategoryId
      });
      res.status(201).json(location);
    } catch (err) {
      const error = new HttpError(
        'Creating location failed, please try again.',
        500
      );
      return next(error);
    }
}

  