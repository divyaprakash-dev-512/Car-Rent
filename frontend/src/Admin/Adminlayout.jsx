import React from "react";
import './admincss/admin.css'
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCar,
  FaClipboardList,
  FaUsers,
  FaPhone,
  FaUserPlus,
  FaSignOutAlt,
  FaTags
} from "react-icons/fa";

export default function Adminlayout() {

  const location = useLocation();

  const menu = [
    { path: "/adminuser-dash", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/brand", name: "Brands", icon: <FaTags /> },
    { path: "/vehicles", name: "Vehicles", icon: <FaCar /> },
    { path: "/booking", name: "Bookings", icon: <FaClipboardList /> },
    { path: "/reguser", name: "Users", icon: <FaUsers /> },
    { path: "/updatecontact", name: "Contact Info", icon: <FaPhone /> },
    { path: "/managesubscribers", name: "Subscribers", icon: <FaUserPlus /> },
  ];

  return (
    <div className="admin-container">

      <div className="sidebar">
        <h2 className="logo">Admin Panel</h2>

        <div className="menu">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          <Link to="/" className="menu-item logout">
            <FaSignOutAlt className="icon" />
            Logout
          </Link>
        </div>
      </div>

    </div>
  );
}