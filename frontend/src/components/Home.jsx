import React, { useEffect, useState } from "react";
import "../styling/home.css";
import {Link} from 'react-router-dom'

export default function Home() {

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://car-rent-hlcq.onrender.com/api/vehicles")
      .then(res => res.json())
      .then(data => {
        setVehicles(data.data || []);
      })
      .catch(err => console.log(err));
  }, []);


  const [stats, setStats] = useState({
    users: 0,
    bookings: 0
  });

  useEffect(() => {
    fetch("https://car-rent-hlcq.onrender.com/api/dashboard")
      .then(res => res.json())
      .then(data => {
        setStats({
          users: data.users,
          bookings: data.bookings
        });
      })
      .catch(err => console.log(err));
  }, []);

  // --- DYNAMIC TESTIMONIALS STATE & FETCH ---
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("https://car-rent-hlcq.onrender.com/api/testimonials")
      .then(res => res.json())
      .then(data => {
        // Agar backend response array hai toh data, varna data.data
        setTestimonials(Array.isArray(data) ? data : data.data || []);
      })
      .catch(err => console.log("Testimonials fetch error:", err));
  }, []);

  return (
    <div className="crp-main-container">

      {/* HERO */}
      <div className="crp-hero-section">
        <div className="crp-hero-overlay">
          <h1>Find The Perfect Car</h1>
          <p>Rent luxury and budget cars easily</p>
        </div>
      </div>

      <div className="crs-main-wrapper">

        {/* HEADING */}
        <div className="crs-heading-area">
          <h2>
            Find the Best <span>Car For You</span>
          </h2>

          <p>
            There are many variations of passages of Lorem Ipsum available.
          </p>

          <button className="crs-newcar-btn">New Car</button>
        </div>

        {/* CAR GRID */}
        <div className="crs-car-grid">

          {vehicles.length > 0 ? (
            vehicles.map((car, i) => (
              <div className="crs-car-card" key={i}>

                {/* IMAGE */}
                <img
                  src={
                    car.images && car.images.length > 0
                      ? `https://car-rent-hlcq.onrender.com/uploads/${car.images[0]}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={car.title}
                />

                {/* INFO */}
                <div className="crs-car-info">
                  <h3>{car.title}</h3>
                  <p>₹{car.price} / Day</p>
                </div>

              </div>
            ))
          ) : (
            <p>No Vehicles Found</p>
          )}

        </div>

      </div>

      <section className="customers-section">
        <h2>Our Happy Customers</h2>
        <p className="subtitle">We have served thousands of satisfied clients</p>

        <div className="stats">
          <div className="card">
            <h1> {stats.users}</h1>
            <p>Customers</p>
          </div>

          <div className="card">
            <h1>{stats.bookings}</h1>
            <p>Bookings</p>
          </div>

          <div className="card">
            <h1>24/7</h1>
            <p>Support</p>
          </div>
        </div>

    
       <div className="testimonials">
  {testimonials.length > 0 ? (
    testimonials.map((item, index) => (
      <div className="testimonial-card" key={item._id || index}>
        <p>"{item.message || item.testimonial || item.content || item.comment}"</p>
        
       
        <h4>
  - {item.user_name || item.name || item.userName || item.username || item.fullName || item.author || "Customer"}
</h4>
      </div>
    ))
  ) : (
    <p>No Testimonials Yet</p>
  )}
</div>
      </section>

<div>
  <Link to={'/admin'}>A</Link>
</div>
    </div>

  
  );
}