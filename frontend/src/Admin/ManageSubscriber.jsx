import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admincss/admin.css";

export default function ManageSubscriber() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    const res = await axios.get("https://car-rent-hlcq.onrender.com/api/subscribers");
    setData(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://car-rent-hlcq.onrender.com/api/subscriberdelete/${id}`);
      setData(data.filter(item => item._id !== id));
    } catch (err) {
      console.log("Delete error", err);
    }
  };

  return (
    <div className="subs-container">
      <h1 className="subs-title">Subscribers</h1>

      <div className="table-wrapper">
        <table className="subs-table">
          <thead>
            <tr>
              <th>Email Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="email-cell">{item.email}</td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}