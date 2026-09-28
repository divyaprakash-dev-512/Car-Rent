import React, { useEffect, useState } from "react";
import "./admincss/admin.css";

export default function ManageContact() {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("https://car-rent-hlcq.onrender.com/api/contact")
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  // ✅ DELETE FUNCTION
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      const res = await fetch(`https://car-rent-hlcq.onrender.com/api/contact/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setContacts(prev => prev.filter(c => c._id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mng-contact">
      <h2>Manage Contacts</h2>

      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.length > 0 ? (
            contacts.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.message}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Contacts Found </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}