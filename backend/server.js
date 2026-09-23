require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const MongoDB = require('./config/db');
const RoutesApi = require('./routes/authRoutes');
const VehicleRoute = require('./routes/vehicleRoute')


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

app.use('/uploads' , express.static("uploads"))

app.use('/api',RoutesApi);
app.use('/api',VehicleRoute);
app.use('/uploads', express.static('uploads'));


MongoDB();

const port = process.env.PORT || 1175;
app.listen(port,()=>{
    console.log("Server is Working on",port);
    
})