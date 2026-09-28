import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReguserEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    country: "",
    city: "",
    address: ""
  });

  useEffect(() => {
    axios.get(`https://car-rent-hlcq.onrender.com/api/reguser/${id}`)
      .then(res => {
        setForm(res.data.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // UPDATE API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://car-rent-hlcq.onrender.com/api/update-Profile/${id}`, form);
      alert("User Updated Successfully");
    } catch (err) {
      console.log("Update error", err);
    }
  };


  return (
    <div>
      <h2>Update User</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" />
        <input name="dob" value={form.dob} onChange={handleChange} placeholder="DOB" />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}