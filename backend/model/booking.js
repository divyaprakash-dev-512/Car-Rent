const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
 

  user_name: String,
  car_name: String,
  from_date: String,
  to_date: String,

  userId:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model('Booking', bookingSchema);