const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { initModels } = require('./models');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contact', contactRoutes);

app.use(errorMiddleware);

const startServer = async () => {
  await connectDB();
  await initModels();

  const PORT = process.env.PORT || 5100;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();