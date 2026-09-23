const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  title: String,
  brand: String,
  overview: String,
  price: Number,
  fuel: String,
  year: String,
  seats: Number,
  images: [String]
});

module.exports = mongoose.model("Vehicle", vehicleSchema);