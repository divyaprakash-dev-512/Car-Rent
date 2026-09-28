const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../model/user');
const Booking = require('../model/booking');
const Contact = require('../model/contact');
const Subscriber = require('../model/subcriber');
const Brand = require('../model/brand');
const sendBookingMail = require('../utils/sendEmail');
const Testimonial = require('../model/testimonial');
const Vehicle = require('../model/vehicles');





exports.getDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const vehicles = await Vehicle.countDocuments();
    const bookings = await Booking.countDocuments();
    const brands = await Brand.countDocuments();

    res.status(200).json({
      users,
      vehicles,
      bookings,
      brands
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Dashboard data not found"
    });
  }
};



exports.Register = async (req,res) => {
try{

 const {name, email, contact, password} = req.body;

 if(!name || !email || !contact || !password ){
  return res.status(400).json({
   message:"All fields required"
  });
 }

 const exist = await User.findOne({email});

 if(exist){
  return res.status(400).json({
   message:"User Already Exist"
  });
 }

 const hashpassword = await bcrypt.hash(password,11);

 const user = await User.create({
  name,
  email,
  contact,
  password:hashpassword,
  role:"user"
 
 });

 res.json({
  success:true,
  message:"User Signup Successfully"
 });

}catch(err){
 console.log(err);
 res.status(500).json({
  message:"Server Error"
 });
}
};

exports.login = async (req,res)=> {
  try{
    const {email,password} = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ 
      message: "Login successful",
      user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.Profile = async (req,res) => {
  try{
    const { id } = req.params;
    const { name, email, contact, city, country, dob, address } = req.body;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({message:"User not found"});

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, city, country, dob,  contact, address },
      { new:true, runValidators:true }
    );

    res.status(200).json({
      message:"Profile updated successfully",
      data: updatedUser
    });
  }catch(err){
    res.status(500).json({ message:"Server error", error: err.message });
  }
};



exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: user });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  
  try {
    const users = await User.find(); 

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users"
    });
  }
};


exports.createBooking = async (req, res) => {
  try {
    const {
      userId,
      user_name,
      car_name,
      from_date,
      to_date
    } = req.body;

    const booking = await Booking.create({
      userId,
      user_name,
      car_name,
      from_date,
      to_date
    });

    res.status(200).json({
      message: "Booking Done",
      booking
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};



exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      bookings
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};




exports.adminLogin = async (req,res) => {
  try{
    const {email,password} = req.body;
    const admin = await User.findOne({email});

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      admin
    });

  }catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

// SAVE CONTACT
exports.contact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });

    await newContact.save();

    res.status(201).json({ message: "Contact Saved" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET ALL CONTACTS
exports.getContact = async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching" });
  }
};



// exports.vehicle = async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     const newVehicle = new ({
//       name,
//       email,
//       phone,
//       message
//     });

//     await newContact.save();

//     res.status(201).json({ message: "Contact Saved" });

//   } catch (err) {
//     console.log(err); // 🔥 IMPORTANT
//     res.status(500).json({ message: "Server Error" });
//   }
// };


// exports.getVehicle = async (req, res) => {
//   try {
//     const data = await Contact.find();
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error fetching" });
//   }
// };


exports.subscribe = async (req,res) => {
  try{
    const {email}= req.body;
    if(!email){
      return res.status(400).json({message:"Email Required"})
    }

    const exist = await Subscriber.findOne({email});
    if(exist){
      return res.status(200).json({message:"Already Subscribed"})
    }

    const data = await Subscriber.create({email});

    res.status(200).json({message:"Subcribe ho chuka hai ",data})
  }catch( error){

    res.status(500).json({message: error.message});
  }
}



exports.getSubscribers = async (req,res) => {
  try{
    const data = await Subscriber.find();

    res.json(data);
  }catch(error){
     res.status(500).json({ message: "Error fetching" });
  }
}



exports.createBrand = async (req, res) => {
  try {
    const { brand } = req.body;

    if (!brand) {
      return res.status(400).json({ message: "Brand name required" });
    }

    const newBrand = new Brand({ brand });
    await newBrand.save();

    res.status(201).json({ message: "Brand created successfully" });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json({
      success: true,
      data: brands
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};




// exports.deletebrand = async (req, res) => {
//   try {
//     await Vehicle.findByIdAndDelete(req.params.id);
//     res.json({ message: "Vehicle deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting vehicle" });
//   }
// };

// router.put("/booking-status/:id",
  
  exports.bookingupdate = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Status updated",
      booking: updated,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id).populate("user");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    
    await sendBookingMail(
      booking.email,
      status,
      booking
    );

    res.json({ message: "Status updated & email sent" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.params.id,
    });

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting subscriber" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Register User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting Users" });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting Users" });
  }
};


exports.addTestimonial = async (req, res) => {
  try {
    const { testimonial, user_name , userId } = req.body;

    if (!testimonial) {
      return res.status(400).json({ message: "Testimonial required" });
    }

    const newData = await Testimonial.create({
      testimonial,
      user_name,
      userId
    });

    res.json({
      message: "Testimonial Added",
      data: newData
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("my id is", id);

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.json({
      message: "Testimonial deleted successfully",
      data: deletedTestimonial,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });

    res.json({
      message: "All Testimonials",
      data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      userId: req.params.id
    });

    res.json(testimonials);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching testimonials"
    });
  }
};

exports.regUserEdit = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ data: user });
};

exports.RegupDate =async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};