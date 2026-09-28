import React, { useState } from "react";

export default function PostTestimonial() {
  const [testimonial, setTestimonial] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("name") || "Customer";

    console.log("USER ID:", userId);
    console.log("USER NAME:", userName);

    // Login check
    if (!userId) {
      alert("Please login first");
      return;
    }

    // Empty testimonial check
    if (!testimonial.trim()) {
      alert("Please enter testimonial");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://car-rent-hlcq.onrender.com/api/posttestimonials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            testimonial: testimonial,
            user_name: userName,
            userId: userId,
          }),
        }
      );

      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to post testimonial"
        );
      }

      alert("Testimonial posted successfully!");

      setTestimonial("");
    } catch (error) {
      console.error("Testimonial Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h2>Post Testimonial</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={testimonial}
          onChange={(e) => setTestimonial(e.target.value)}
          placeholder="Write your testimonial..."
          rows="5"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            resize: "vertical",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Posting..." : "Post Testimonial"}
        </button>
      </form>
    </div>
  );
}