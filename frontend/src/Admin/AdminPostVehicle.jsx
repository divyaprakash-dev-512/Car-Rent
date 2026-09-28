import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import "./admincss/admin.css";

export default function AdminPostVehicle() {

  const [form, setForm] = useState({
    title: "",
    brand: "",
    overview: "",
    price: "",
    fuel: "",
    year: "",
    seats: ""
  });

  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setImages((prev) => [...prev, file]);
};

  useEffect(() => {
    fetch("https://car-rent-hlcq.onrender.com/api/brand")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch("https://car-rent-hlcq.onrender.com/api/vehicle", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      

      if (!res.ok) {
        console.log(data);
        throw new Error(data.message || "Error");
      }

      alert("Vehicle Added Successfully");

      setForm({
        title: "",
        brand: "",
        overview: "",
        price: "",
        fuel: "",
        year: "",
        seats: ""
      });

      setImages([]);

    } catch (err) {
      console.log("FRONTEND ERROR:", err);
      alert(err.message);
    }
  };

  return (
    <div className="pv-container">
      <h2 className="pv-title">Post A Vehicle</h2>

      <div className="pv-box">

        <input name="title" placeholder="Vehicle Title" value={form.title} onChange={handleChange} />

        <select name="brand" value={form.brand} onChange={handleChange}>
          <option value="">Select Brand</option>
          {brands.map((b, i) => (
            <option key={i} value={b.brand}>{b.brand}</option>
          ))}
        </select>

        <textarea name="overview" placeholder="Overview" value={form.overview} onChange={handleChange}></textarea>

        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />

        <select name="fuel" value={form.fuel} onChange={handleChange}>
          <option value="">Select Fuel</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>

        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />

        <input name="seats" type="number" placeholder="Seats" value={form.seats} onChange={handleChange} />

        
       <input
  type="file"
  accept="image/jpeg,image/jpg,image/png,image/webp"
  onChange={handleFileChange}
/>

<input
  type="file"
  accept="image/jpeg,image/jpg,image/png,image/webp"
  onChange={handleFileChange}
/>

<input
  type="file"
  accept="image/jpeg,image/jpg,image/png,image/webp"
  onChange={handleFileChange}
/>

        <button onClick={handleSubmit}>Save</button>

        <Link to={'/vechele'} className="adminvehicle">Show Manage Vehicles</Link>

      </div>
    </div>
  );
}