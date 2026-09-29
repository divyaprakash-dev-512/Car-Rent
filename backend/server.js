require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const MongoDB = require("./config/db");

const RoutesApi = require("./routes/authRoutes");
const VehicleRoute = require("./routes/vehicleRoute");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploaded images serve karne ke liye
app.use("/uploads", express.static("uploads"));

app.use("/api", RoutesApi);
app.use("/api", VehicleRoute);

MongoDB();

const port = process.env.PORT || 1175;

app.listen(port, () => {
  console.log("Server is Working on", port);
});