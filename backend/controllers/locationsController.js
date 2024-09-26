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

  