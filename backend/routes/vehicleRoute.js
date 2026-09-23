const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getVehicles,deleteVehicle
} = require('../controller/vehicleController');



const upload = require('../middleWare/upload')

// POST (Admin)
router.post("/vehicle", upload.array("images", 3), createVehicle);

// GET (Frontend)
router.get("/vehicles", getVehicles);
router.delete('/vehicle/:id',deleteVehicle)

module.exports = router;