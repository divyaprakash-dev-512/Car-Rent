import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styling/vehicledata.css'

export default function RgUsers() {
  const [users, setUsers] = useState([]);

  // GET USERS
  useEffect(() => {
    fetch("https://car-rent-hlcq.onrender.com/api/reguser")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      });
  }, []);

  // DELETE USER
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://car-rent-hlcq.onrender.com/api/deleteUser/${id}`);
      
      // UI update after delete
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.log("Delete error", err);
    }
  };

  return (
    <div className="usr-container">
      <h2>All Users</h2>

      <table className="usr-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>DOB</th>
            <th>Country</th>
            <th>City</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.contact}</td>
              <td>{u.dob}</td>
              <td>{u.country}</td>
              <td>{u.city}</td>
              <td>{u.address}</td>

              <td>

                <button
                  onClick={() => handleDelete(u._id)}
                  className="delete-btn"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}