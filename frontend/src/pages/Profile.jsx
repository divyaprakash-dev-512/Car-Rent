import { Link } from "react-router-dom";
import "../styling/profile.css";

export default function Profile() {
  return (
    <div className="profile-dashboard">
      {/* VERTICAL SIDEBAR */}
      <aside className="profile-sidebar">
        {/* TOP PROFILE HEADER */}
        <div className="profile-top">
          <img
            src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
            alt="user"
          />
          <h3>{(localStorage.getItem("name") || "User").toUpperCase()}</h3>
        </div>

        {/* NAVIGATION MENU */}
        <nav className="profile-nav">
          <ul>
            <li>
              <Link to="/profileseting" className="profilelink">
                Profile Settings
              </Link>
            </li>
            <li>
              <Link to="/updatepassword" className="profilelink">
                Update Password
              </Link>
            </li>
            <li>
              <Link to="/mybooking" className="profilelink">
                My Booking
              </Link>
            </li>
            <li>
              <Link to="/posttestimonial" className="profilelink">
                Post a Testimonial
              </Link>
            </li>
            <li>
              <Link to="/mytestimonial" className="profilelink">
                My Testimonials
              </Link>
            </li>
            <li className="logout-item">
              <Link to="/" className="profilelink logout">
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}