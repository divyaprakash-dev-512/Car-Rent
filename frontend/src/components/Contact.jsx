import React, { useState,useEffect } from "react";
import "../styling/contact.css";

export default function Contact() {

  // const [contacts, setContacts] = useState([]);
  
  //   useEffect(() => {
  //     fetch("http://localhost:1175/api/contact")
  //       .then(res => res.json())
  //       .then(data => setContacts(data));
  //   }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:1175/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      alert(data.message);

      // clear form
      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="contact-container">

      <div className="contact-left">
        <h2>Get in touch using the form below</h2>

        <label>Full Name *</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />

        <label>Email Address *</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />

        <label>Phone Number *</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} />

        <label>Message *</label>
        <textarea name="message" value={form.message} onChange={handleChange}></textarea>

        <button className="send-btn" onClick={handleSubmit}>
          Send Message
        </button>
      </div>

      <div className="contact-right">
      {/* <tbody>
          {contacts.map((item, index) => (
            <tr key={index}>
              <h2>Contact Info</h2>
              <h5> 📍{item.name}</h5> <br /> 
              <h5>📧{item.email}</h5> <br /> 
              <h5>📞{item.phone}</h5> <br />
            </tr>
          ))}
        </tbody> */}
      </div>

    </div>
  );
}