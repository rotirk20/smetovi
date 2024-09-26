import dotenv from 'dotenv';
import express from 'express';
import locationsRoutes from './routes/locationRoutes.js';
import {initializeDatabase} from './utils/dbInit.js';
import HttpError from './models/HttpError.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/locations", locationsRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Database connection and start server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database or sync models:", err);
    process.exit(1);
  });
