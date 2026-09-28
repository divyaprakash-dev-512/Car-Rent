import React, { useEffect, useState } from "react";

export default function MyTestimonial() {
  const [myTestimonials, setMyTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Logged-in user
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("userInfo"));

  // User ki ID
  const userId = user?._id || user?.id || user?.userId;

  useEffect(() => {
    const fetchMyTestimonials = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // ID route me bhej rahe hain
        const response = await fetch(
          `https://car-rent-hlcq.onrender.com/api/testimonials/${userId}`
        );

        const data = await response.json();

        const testimonials = Array.isArray(data)
          ? data
          : data.data || [];

        setMyTestimonials(testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTestimonials();
  }, [userId]);

  if (!userId) {
    return (
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h3>Please login first to view your testimonials.</h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h3>Loading your testimonials...</h3>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2>My Testimonials</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {myTestimonials.length > 0 ? (
          myTestimonials.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  marginBottom: "8px",
                }}
              >
                "{item.testimonial}"
              </p>

              <h4 style={{ color: "#555" }}>
                - {item.user_name || user?.name || "You"}
              </h4>
            </div>
          ))
        ) : (
          <p>No testimonials found for your User ID: {userId}</p>
        )}
      </div>
    </div>
  );
}
