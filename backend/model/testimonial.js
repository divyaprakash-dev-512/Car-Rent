const mongoose = require("mongoose");
const testimonialSchema = new mongoose.Schema({
  testimonial: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    default: "Anonymous"
  },
  userId: {
    type: mongoose.Scehma.objectId,
    ref:"User",
    required:true
  },
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);