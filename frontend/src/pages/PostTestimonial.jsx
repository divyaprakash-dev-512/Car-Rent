import React from 'react'
import '../styling/profile.css'
export default function PostTestimonial() {
  return (
    <div className="pt-wrapper">
      <div className="pt-card">
        
        <h1 className="pt-title">Post a Testimonial</h1>

        <label className="pt-label">Testimonial</label>

        <textarea 
          className="pt-textarea" 
          placeholder="Write your testimonial here..."
        ></textarea>

        <button className="pt-btn">Save</button>

      </div>
    </div>
  )
}