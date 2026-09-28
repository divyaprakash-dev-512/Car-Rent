import React, { useEffect, useState } from "react";

export default function MyTestimonial() {
  const [myTestimonials, setMyTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMyTestimonials = async () => {
      try {
        const stored =
          localStorage.getItem("user") ||
          localStorage.getItem("userInfo");

        if (!stored) {
          console.log("USER NOT FOUND");
          setLoading(false);
          return;
        }

        const loggedUser = JSON.parse(stored);

        console.log("USER:", loggedUser);

        const userId =
          loggedUser?._id ||
          loggedUser?.id ||
          loggedUser?.userId;

        console.log("USER ID:", userId);

        if (!userId) {
          setLoading(false);
          return;
        }

        setUser(loggedUser);

        const response = await fetch(
          `https://car-rent-hlcq.onrender.com/api/testimonials/${userId}`
        );

        console.log("STATUS:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("API DATA:", data);

        const testimonials = Array.isArray(data)
          ? data
          : data.testimonials || data.data || [];

        console.log("FINAL TESTIMONIALS:", testimonials);

        setMyTestimonials(testimonials);
      } catch (error) {
        console.error("FETCH ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTestimonials();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h3>Loading your testimonials...</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h3>Please login first to view your testimonials.</h3>
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
          <p>No testimonials found.</p>
        )}
      </div>
    </div>
  );
}