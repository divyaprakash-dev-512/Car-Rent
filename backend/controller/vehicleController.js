const Vehicle = require('../model/vehicles');

exports.createVehicle = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    const {
      title,
      brand,
      overview,
      price,
      fuel,
      year,
      seats
    } = req.body;

    let imagePath = [];

    if (req.files && Array.isArray(req.files)) {
      imagePath = req.files.map(file => file.filename);
    }

    if (!title || !brand || !price) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const newVehicle = new Vehicle({
      title,
      brand,
      overview,
      price: Number(price),
      fuel,
      year,
      seats,
      images: imagePath
    });

    await newVehicle.save();

    res.status(201).json({
      message: "Vehicle Added",
      data: newVehicle
    });

  } catch (err) {
    console.error("ERROR:", err);
      
    res.status(500).json({ message: err.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.json({
      data: vehicles
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting vehicle" });
  }
};