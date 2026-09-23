import React, { useEffect, useState } from "react";
import "../styling/about.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  const userId = localStorage.getItem("userId");

  fetch(`http://localhost:1175/api/my-bookings/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("BOOKING API RESPONSE:", data);
      setBookings(data.bookings);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  return (
    <div>
      <div className="booking-container">
        <h2 className="title">MY BOOKINGS</h2>

        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              
              <div className="booking-details">
                <h3>{booking.car_name}</h3>

                <p>
                  From Date: {booking.from_date}
                </p>

                <p>
                  To Date: {booking.to_date}
                </p>
              </div>

              <div className="booking-right">
                <button className="status-btn">
                  {booking.status}
                </button>
              </div>

            </div>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>
    </div>
  );
}