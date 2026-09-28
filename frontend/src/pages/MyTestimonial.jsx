import React, { useEffect, useState } from "react";

export default function MyTestimonial() {
  const [myTestimonials, setMyTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyTestimonials = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("name");

      console.log("USER ID:", userId);
      console.log("USER NAME:", userName);

      if (!userId) {
        console.log("USER ID NOT FOUND");
        setLoading(false);
        return;
      }

      setUser({
        _id: userId,
        name: userName || "Customer",
      });

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

  useEffect(() => {
    fetchMyTestimonials();
  }, []);

  // DELETE TESTIMONIAL
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this testimonial?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await fetch(
        `https://car-rent-hlcq.onrender.com/api/testimonials/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log("DELETE STATUS:", response.status);
      console.log("DELETE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete testimonial"
        );
      }

      // UI se bhi remove karo
      setMyTestimonials((prev) =>
        prev.filter((item) => (item._id || item.id) !== id)
      );

      alert("Testimonial deleted successfully!");
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Loading
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        <h3>Loading your testimonials...</h3>
      </div>
    );
  }

  // Login nahi hai
  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
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
          myTestimonials.map((item) => {
            const testimonialId = item._id || item.id;

            return (
              <div
                key={testimonialId}
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
                  -{" "}
                  {item.user_name ||
                    item.name ||
                    item.userName ||
                    user?.name ||
                    "You"}
                </h4>

                <button
                  onClick={() => handleDelete(testimonialId)}
                  disabled={deletingId === testimonialId}
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    cursor:
                      deletingId === testimonialId
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {deletingId === testimonialId
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            );
          })
        ) : (
          <p>No testimonials found.</p>
        )}
      </div>
    </div>
  );
}