import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import "../styling/cardetail.css";

export default function CarDetails() {

  const { id } = useParams(); 

  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    user_name: "",
    car_name: "",
    from_date: "",
    to_date: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    const data = {
      userId: localStorage.getItem("userId"), 
      email: localStorage.getItem("email"),  
      user_name: form.user_name,
      car_name: form.car_name,
      from_date: form.from_date,
      to_date: form.to_date
    };

    if (!data.user_name || !data.car_name || !data.from_date || !data.to_date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:1175/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.text();
      alert(result);

      // reset form
      setForm({
        user_name: "",
        car_name: "",
        from_date: "",
        to_date: ""
      });

    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  useEffect(() => {
    fetch("http://localhost:1175/api/vehicles")
      .then(res => res.json())
      .then(data => setVehicles(data.data || []))
      .catch(err => console.log(err));
  }, []);

  const filteredCars = vehicles.filter((car) => car._id === id);

  return (
    <div className="carDetails-container">
      <div className="carDetails-wrapper">

        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div className="carDetails-card" key={car._id}>

              {/* IMAGE */}
              <img
                className="carDetails-image"
                src={
                  car.images?.length > 0
                    ? `http://localhost:1175/uploads/${car.images[0]}`
                    : "https://via.placeholder.com/300"
                }
                alt={car.title}
              />

              {/* INFO */}
              <div className="carDetails-header">
                <h1 className="carDetails-title">{car.title}</h1>
                <p className="carDetails-price">₹ {car.price} /day</p>
              </div>

              {/* SPECS */}
              <div className="carDetails-specs">
                <div className="carDetails-specBox">{car.fuel}</div>
                <div className="carDetails-specBox">{car.year}</div>
                <div className="carDetails-specBox">{car.seats} seats</div>
              </div>

              {/* BOOKING FORM */}
              <div className="carDetails-booking">

                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  className="carDetails-input"
                  value={form.user_name}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="car_name"
                  placeholder="Enter car name"
                  className="carDetails-input"
                  value={form.car_name}
                  onChange={handleChange}
                />

                <input
                  type="date"
                  name="from_date"
                  className="carDetails-input"
                  value={form.from_date}
                  onChange={handleChange}
                />

                <input
                  type="date"
                  name="to_date"
                  className="carDetails-input"
                  value={form.to_date}
                  onChange={handleChange}
                />

                <button
                  className="carDetails-button"
                  onClick={handleSubmit}
                >
                  Book Now
                </button>

              </div>

            </div>
          ))
        ) : (
          <p className="carDetails-empty">Loading / No Car Found</p>
        )}

      </div>
    </div>
  );
}