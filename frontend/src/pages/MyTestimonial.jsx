import React, { useEffect, useState } from "react";

export default function MyTestimonial() {
  const [myTestimonials, setMyTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Safe localStorage extraction
  const getUserFromStorage = () => {
    try {
      const stored = localStorage.getItem("user") || localStorage.getItem("userInfo");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("localStorage parse error:", err);
      return null;
    }
  };

  const user = getUserFromStorage();
  const userId = user?._id || user?.id || user?.userId;

  useEffect(() => {
    const fetchMyTestimonials = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://car-rent-hlcq.onrender.com/api/testimonials/${userId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data from Backend:", data); // Debugging Log

        const testimonials = Array.isArray(data)
          ? data
          : data.testimonials || data.data || [];

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
              key={item._id || item.id}
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
                "{item.testimonial || item.message || item.content}"
              </p>

              <h4 style={{ color: "#555" }}>
                - {item.user_name || item.userName || user?.name || "You"}
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