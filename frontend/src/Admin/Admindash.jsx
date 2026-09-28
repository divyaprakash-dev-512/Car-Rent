import React, { useEffect, useState } from "react";

export default function Admindash() {

  const [data, setData] = useState({
    users: 0,
    vehicles: 0,
    bookings: 0,
    brands: 0
  });

  useEffect(() => {

    fetch("https://car-rent-hlcq.onrender.com/api/dashboard")
      .then((res) => res.json())
      .then((result) => {
        console.log("Dashboard Data:", result);
        setData(result);
      })
      .catch((error) => {
        console.log("Dashboard Error:", error);
      });

  }, []);


  return (
    <>
      <div className="admin-row">

        {/* Registered Users */}
        <div className="ad-box">
          <h5>{data.users}+</h5>
          <p>REG USERS</p>
          <span className="check-link">
            Check Here →
          </span>
        </div>


        {/* Vehicles */}
        <div className="ad-box">
          <h5>{data.vehicles}+</h5>
          <p>LAST VEHICLES</p>
          <span className="check-link">
            Check Here →
          </span>
        </div>


        {/* Bookings */}
        <div className="ad-box">
          <h5>{data.bookings}+</h5>
          <p>TOTAL BOOKING</p>
          <span className="check-link">
            Check Here →
          </span>
        </div>

      </div>


      <div className="admin-row">

        {/* Brands */}
        <div className="ad-box">
          <h5>{data.brands}+</h5>
          <p>LISTED BRANDS</p>
          <span className="check-link">
            Check Here →
          </span>
        </div>


        {/* Subscribers */}
        <div className="ad-box">
          <h5>0+</h5>
          <p>SUBSCRIBERS</p>
          <span className="check-link">
            Check Here →
          </span>
        </div>


        {/* Testimonials */}
        <div className="ad-box">
          <h5>0+</h5>
          <p>TESTIMONIALS</p>
          <span className="check-link">
            Check Here →
          </span>
        </div>

      </div>
    </>
  );
}