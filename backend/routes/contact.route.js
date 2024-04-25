require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const RATE_LIMIT_INTERVAL = 60 * 60 * 1000;
const RATE_LIMIT_COUNT = 2;
const ipCountMap = new Map();

router.post("/send-email", (req, res) => {
  console.log(req.body);
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const now = Date.now();
  const ipCount = ipCountMap.get(ip) || { count: 0, timestamp: now };
  if (now - ipCount.timestamp < RATE_LIMIT_INTERVAL) {
    if (ipCount.count >= RATE_LIMIT_COUNT) {
      res.status(429).send("Too many requests, Try again later.");

      return;
    }
    ipCount.count++;
  } else {
    ipCount.count = 1;
    ipCount.timestamp = now;
  }
  ipCountMap.set(ip, ipCount);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    // requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let messageHtml = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet">
    <div style="background-color: #151516; color: #f9f9f9;"><center><br><br>
      <a href="mabsrencode.com"><img width="150px" src="https://mabsrencode.com/images/logo-light.png" alt="logo"></a><br>
      <p style="font-family: 'Teko', sans-serif; color: #f9f9f9; font-weight: 700;">Front-End Developer</p><br><br>
      <h3 style="font-family: 'Teko', sans-serif; color: #f9f9f9; font-weight: 400;">A Contact Request from <strong>${req.body.name}.</strong></h3><br><br>
    </center></div><br><br>
    Name: ${req.body.name}<br>Phone Number: ${req.body.phone}<br><br>Message: ${req.body.message}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `Message from: ${req.body.email}: ${req.body.subject}`,
    html: messageHtml,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});
module.exports = router;
