const mongoose = require("mongoose");
const testimonialSchema = new mongoose.Schema({
  testimonial: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    default: "Anonymous"
  }
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);