import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admincss/admin.css";

const AdminBrand = () => {

  const [brandName, setBrandName] = useState("");
  const [brands, setBrands] = useState([]);

  // GET BRANDS
  useEffect(() => {
    fetch("http://localhost:1175/api/brand")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // CREATE BRAND
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandName.trim()) {
      alert("Enter brand name");
      return;
    }

    try {
      const res = await fetch("http://localhost:1175/api/createbrand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ brand: brandName })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
      } else {
        alert("Brand Created Successfully");

        setBrands([...brands, data.data]);
        setBrandName("");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  // DELETE BRAND
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1175/api/deleteBrands/${id}`);
      setBrands(brands.filter((b) => b._id !== id)); 
    } catch (err) {
      console.log("Delete error", err);
    }
  };

  return (
  <div className="brand-container">

    {/* LEFT SIDE - CREATE BRAND */}
    <div className="left-panel">
      <h2 className="title-br">Create Brand</h2>

      <div className="card-br">
        <div className="card-header">FORM FIELDS</div>

        <form onSubmit={handleSubmit} className="formmm">
          <div className="form-group">
            <label>Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name..."
              required
            />
          </div>

          <button type="submit" className="btn-br">
            Submit
          </button>
        </form>
      </div>
    </div>

    {/* RIGHT SIDE - MANAGE BRANDS */}
    <div className="right-panel">
      <h2 className="title-br">Manage Brands</h2>

      <div className="table-box">
        <table className="brand-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {brands.length > 0 ? (
              brands.map((b, i) => (
                <tr key={b._id}>
                  <td>{i + 1}</td>
                  <td>{b.brand}</td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(b._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Brands Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  </div>
);
};

export default AdminBrand;