const express = require("express");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const locationRoutes = require("./routes/locationRoutes");
const initDB = require("./config/dbInit");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

initDB();

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/locations", locationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
