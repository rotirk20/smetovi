const LocationService = require("../services/locationService");

exports.createLocation = async (req, res, next) => {
  try {
    const location = await LocationService.createLocation(req.body);
    res.status(201).json({ message: "Location created", location });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const location = await LocationService.updateLocation(
      req.params.id,
      req.body
    );
    res.status(200).json({ message: "Location updated", location });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllLocations = async (req, res, next) => {
  try {
    const [rows] = await LocationService.getAllLocations();
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

exports.getLocationById = async (req, res, next) => {
  try {
    const [rows] = await LocationService.getLocationById(req.params.id);
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    await LocationService.deleteLocation(req.params.id);
    res.status(200).json({ message: "Location deleted" });
  } catch (error) {
    next(error);
  }
};
