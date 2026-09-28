import React, { useState } from "react";
import axios from "axios";
import "../styling/profile.css";

export default function PostTestimonial() {

  const [testimonial, setTestimonial] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testimonial.trim()) {
      alert("Please write your testimonial");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
  "https://car-rent-hlcq.onrender.com/api/posttestimonials",
  {
    testimonial: testimonial,
    user_name: user?.name || "Customer"
  }
);

      console.log(JSON.parse(localStorage.getItem("user")));

      alert(res.data.message || "Testimonial Added");

      setTestimonial("");

    } catch (error) {
      console.log("Testimonial Error:", error);
      alert(
        error.response?.data?.message ||
        "Failed to add testimonial"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-wrapper">
      <div className="pt-card">

        <h1 className="pt-title">Post a Testimonial</h1>

        <form onSubmit={handleSubmit}>

          <label className="pt-label">
            Testimonial
          </label>

          <textarea
            className="pt-textarea"
            placeholder="Write your testimonial here..."
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
          />

          <button
            className="pt-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </form>

      </div>
    </div>
  );
}