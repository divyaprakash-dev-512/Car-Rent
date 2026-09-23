const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aryan120507143@gmail.com",
    pass: "twpa zlan emod nlbh",
  },
});

module.exports = transporter;