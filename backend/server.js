require('dotenv').config();
const express = require('express');
const locationsRoutes = require('./routes/locationRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/locations', locationsRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});