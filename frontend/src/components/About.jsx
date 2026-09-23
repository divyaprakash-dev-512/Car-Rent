import React from "react";
import "../styling/about.css";
import { useState } from "react";
import axios from 'axios'

export default function About() {

  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    try {
      const res = await axios.post("http://localhost:1175/api/subscribe", { email });
      console.log(res.data);
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  };  
  return (
    <div className="abp-main-wrapper">

      {/* Top Banner */}

      <div className="abp-banner-section">
        <div className="abp-banner-overlay">
          <h1>About Us</h1>
          <p>Home &gt; About Us</p>
        </div>
      </div>

      {/* Page Title */}

      <div className="abp-content-section">
        <h2>About Us</h2>
      </div>


<div className="footer">

      {/* LEFT SIDE */}
      <div className="footer-left">
        <h4>ABOUT US</h4>
        <p>› About Us</p>
        <p>› FAQs</p>
        <p>› Privacy</p>
        <p>› Terms of use</p>
        <p>› Admin Login</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="footer-right">
        <h4>SUBSCRIBE NEWSLETTER</h4>

       <div>
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubscribe}>Subscribe</button>
    </div>

        <p className="note">
          *We send great deals and latest auto news to our subscribed users every week.
        </p>
      </div>

    </div>
    </div>
  );
}