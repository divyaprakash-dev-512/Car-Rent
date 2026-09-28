import React from 'react'
import { useEffect,useState } from 'react';
import '../styling/profile.css'

export default function ProfileSetting() {
  const [profile, setProfile] = useState({
      name: "",
      email: "",
      contact: "",
      dob: "",
      address: "",
      country: "",
      city: ""
    });
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const userId = localStorage.getItem("userId"); 
  
          if (!userId) {
            alert("User not logged in");
          
            return;
          }
          const res = await fetch(`https://car-rent-hlcq.onrender.com/api/profile/${userId}`);
  
          const data = await res.json();
  
          if (!res.ok) {
            throw new Error(data.message || "Failed to fetch profile");
          }
  
          setProfile({
    name: data.data.name || "",
    email: data.data.email || "",
    contact: data.data.contact || "",
    dob: data.data.dob || "",
    address: data.data.address || "",
    country: data.data.country || "",
    city: data.data.city || ""
  });
  
        } catch (err) {
          console.error("Fetch error:", err);
          alert("Failed to load profile");
        }
      };
  
      fetchProfile();
    }, []);
  
    
    const handleChange = (e) => {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value
      });
    };
  
   
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const userId = localStorage.getItem("userId");
  
        const res = await fetch(`https://car-rent-hlcq.onrender.com/api/profile/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(profile) 
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || "Update failed");
        }
  
        alert("Profile updated successfully");
       
  
      } catch (err) {
        console.error("Update error:", err);
        alert("Profile update failed");
      }
    };
  
  return (
    <div>
        <div className="profile-content">

          <h2>GENERAL SETTINGS</h2>

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              type="text"
              name="contact"
              value={profile.contact}
              onChange={handleChange}
            />

            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
            />

            <label>Your Address</label>
            <textarea
              name="address"
              style={{ width: "400px", height: "120px", borderRadius: "10px" }}
              value={profile.address}
              onChange={handleChange}
            ></textarea>

            <label>Country</label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleChange}
            />

            <label>City</label>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
            />
                <br />
            <button type="submit">Save Changes</button>

          </form>

        </div>
    </div>
  )
}
