import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styling/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handlechange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://car-rent-hlcq.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("userId", data.user._id);

        if (data.user.role === "admin") {
          navigate("/adminuser-dash");
        } else {
          navigate("/profileseting");
        }

        
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  

  const [RegData, setRegData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmpassword: ""
  });

  const handlChange = (e) => {
    setRegData({
      ...RegData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (RegData.password !== RegData.confirmpassword) {
      alert("Password does not match");
      return;
    }

    try {
      const res = await fetch("https://car-rent-hlcq.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(RegData)
      });

      const data = await res.json();
      alert(data.message);
      setShowRegister(false);
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="crnav-wrapper">

      {/* Top Bar */}
      <div className="crnav-topbar">
        <div className="crnav-logo">
          <h3>Car Rental Portal</h3>
        </div>

        <div className="crnav-support">
          <span>FOR SUPPORT MAIL US :</span>
          <p>info@gmail.com</p>
        </div>

        <div className="crnav-phone">
          <span>SERVICE HELPLINE CALL US :</span>
          <p>8974561236</p>
        </div>

        <div className="loginregister">
          <span className="loglink" onClick={() => setShowLogin(true)}>Login /</span>
          <span className="loglink" onClick={() => setShowRegister(true)}>Register</span>
        </div>
      </div>

      {/* Navbar */}
      <div className="crnav-navbar">
        <div className="crnav-links">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/cars">CAR LISTING</Link>
          <Link to="/faqs">FAQS</Link>
          <Link to="/contact">CONTACT US</Link>
        </div>

        <div className="crnav-right">

          
          <ul className="crnav-account" ref={dropdownRef}>
           
            <li
              onClick={() => setOpenDropdown(!openDropdown)}
              style={{ cursor: "pointer" }}
            >
              
              {localStorage.getItem("name") || "Account"}
            </li>

            {openDropdown && (
              <div className="dropdown">
      
                <li><Link to="/profile">Profile</Link></li>
                <li> <Link to="/booking">My Booking</Link></li>
                <li onClick={handleLogout}><Link>Logout</Link></li>
              </div>
            )}
          </ul>

          <input
            className="crnav-search"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* LOGIN POPUP */}
      {showLogin && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
                                                                     
            <h2>Login</h2>

            <input type="email" name="email" placeholder="Email" onChange={handlechange} />
            <input type="password" name="password" placeholder="Password" onChange={handlechange} />

            <button className="submit-btn" onClick={handlesubmit}>Login</button>
          </div>
        </div>
      )}

      {/* REGISTER POPUP */}
      {showRegister && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={() => setShowRegister(false)}>×</button>

            <h2>Register</h2>

            <input type="text" name="name" placeholder="Name" onChange={handlChange} />
            <input type="email" name="email" placeholder="Email" onChange={handlChange} />
            <input type="number" name="contact" placeholder="Contact" onChange={handlChange} />
            <input type="password" name="password" placeholder="Password" onChange={handlChange} />
            <input type="password" name="confirmpassword" placeholder="Confirm Password" onChange={handlChange} />

            <button className="submit-btn" onClick={handleRegister}>Register</button>
          </div>
        </div>
      )}


    </div>
  );
}