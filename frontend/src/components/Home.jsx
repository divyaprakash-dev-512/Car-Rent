import React, { useEffect, useState } from "react";
import "../styling/home.css";

export default function Home() {

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
                      ? `http://localhost:1175/uploads/${car.images[0]}`
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
          <h1>10K+</h1>
          <p>Customers</p>
        </div>

        <div className="card">
          <h1>500+</h1>
          <p>Bookings</p>
        </div>

        <div className="card">
          <h1>4.9⭐</h1>
          <p>Rating</p>
        </div>

        <div className="card">
          <h1>24/7</h1>
          <p>Support</p>
        </div>
      </div>

      <div className="testimonials">
        <div className="testimonial-card">
          <p>"Amazing service! Car was clean and smooth."</p>
          <h4>- Rahul Sharma</h4>
        </div>

        <div className="testimonial-card">
          <p>"Best rental experience ever. Highly recommended!"</p>
          <h4>- Priya Verma</h4>
        </div>

        <div className="testimonial-card">
          <p>"Affordable and reliable service. Loved it!"</p>
          <h4>- Aman Gupta</h4>
        </div>
      </div>
    </section>




    </div>
  );
}