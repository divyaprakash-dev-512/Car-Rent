import React from "react";
import {Link} from 'react-router-dom';
import { useState,useEffect } from "react";
import "../App.css";

export default function Car() {

  const [brands, setBrands] = useState([]);

  const [form, setForm] = useState({
     
      brand: "" 
     
    });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

   



      useEffect(() => {
        fetch("http://localhost:1175/api/brand")
          .then((res) => res.json())
          .then((data) => {
            setBrands(data.data || []);
          })
          .catch((err) => console.log(err));
      }, []);


      //image fetch krwane k liye
      const [vehicles, setVehicles] = useState([]);
      
        useEffect(() => {
          fetch("http://localhost:1175/api/vehicles")
            .then(res => res.json())
            .then(data => {
              setVehicles(data.data || []);
            })
            .catch(err => console.log(err));
        }, []);

  return (
    <>
      <div className="clb-main-container">
        <div className="clb-overlay">
          <h1 className="clb-title">Car Listing</h1>

          <p className="clb-breadcrumb">
            Home <span> &gt; </span> Car Listing
          </p>
        </div>
      </div>

      {/* Car Listing Section */}

      <div className="car-list-wrapper">

        {/* Sidebar */}

        <div className="car-sidebar">

          <h3>Find Your Car</h3>

          <select name="brand" value={form.brand} onChange={handleChange}>
          <option value="">Select Brand</option>
          {brands.map((b, i) => (
            <option key={i} value={b.brand}>{b.brand}</option>
          ))}
        </select>

          <select>
            <option>Select Fuel Type</option>
          </select>

          <button className="search-btn">Search Car</button>


         </div>

        {/* Car Listings */}

        <div className="car-listings">

          <h4 className="listing-count">5 Listings</h4>


          <div className="car-card">

            <div className="car-info">


             {vehicles.length > 0 ? (
            vehicles.map((car, i) => (
              <div className="crs-car-card" key={i}>

                {/* IMAGE */}
                <img
                  src={
                    car.images && car.images.length > 0
                      ? `http://localhost:1175/uploads/${car.images[0]}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={car.title}
                />

                {/* INFO */}
                <div className="crs-car-info">
                  <h3>{car.title}</h3>
                  <p>₹{car.price} / Day</p>

                  <Link to={`/carview/${car._id}`} className="details-btn">View Details</Link>
                </div>
                </div>
            ))
          )  : (
            <p>No Vehicles Found</p>
          )}


            </div>

          </div>


          

            </div>
          </div>

        

    
    </>
  );
}