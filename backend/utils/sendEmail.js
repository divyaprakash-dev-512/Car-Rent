const transporter = require('../config/mail');

const sendBookingMail = async (email, status, booking) => {
  try {
    await transporter.sendMail({
      from: "aryan120507143@gmail.com",
      to: email,
      subject: `Booking ${status}`,
      html: `
        <h2>Booking Update</h2>
        <p><b>Car:</b> ${booking.car_name}</p>
        <p><b>From:</b> ${booking.from_date}</p>
        <p><b>To:</b> ${booking.to_date}</p>
        <p><b>Status:</b> ${status}</p>
      `,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log("Mail Error:", err);
  }
};

module.exports = sendBookingMail;