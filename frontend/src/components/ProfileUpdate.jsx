import React from 'react'

export default function ProfileUpdate() {
  return (
   <div style={{marginLeft:'200px'}}>
        <div className="profile-content">

          <h2>GENERAL SETTINGS</h2>

          <form>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
            //   value={profile.name}
            //   onChange={handleChange}
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
            //   value={profile.email}
            //   onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              type="text"
              name="contact"
            //   value={profile.contact}
            //   onChange={handleChange}
            />

            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
            //   value={profile.dob}
            //   onChange={handleChange}
            />

            <label>Your Address</label>
            <textarea
              name="address"
              style={{ width: "400px", height: "120px", borderRadius: "10px" }}
            //   value={profile.address}
            //   onChange={handleChange}
            ></textarea>

            <label>Country</label>
            <input
              type="text"
              name="country"
            //   value={profile.country}
            //   onChange={handleChange}
            />

            <label>City</label>
            <input
              type="text"
              name="city"
            //   value={profile.city}
            //   onChange={handleChange}
            />
                <br />
            <button type="submit">Save Changes</button>

          </form>

        </div>
    </div>
  )
}
