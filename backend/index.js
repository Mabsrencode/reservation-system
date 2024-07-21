const express = require("express");
const cors = require("cors");
// const axios = require("axios");
const cron = require("node-cron");
const http = require("http");
const app = express();
app.use(cors());
app.use(express.json());
const dbConfig = require("./db");
const servicesRoute = require("./routes/services.route");
const usersRoute = require("./routes/users.route");
const bookingRoute = require("./routes/booking.route");
const contactRoute = require("./routes/contact.route");
const port = process.env.PORT || 4000;
app.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});
app.use("/api", servicesRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/contact", contactRoute);
const pingServer = () => {
  http
    .get("https://segen-consulting.onrender.com", (res) => {
      console.log("Pinged server, status code:", res.statusCode);
    })
    .on("error", (err) => {
      console.error("Error pinging server:", err.message);
    });
};
app.listen(port, () => console.log(`Starting server on port ${port}`));
cron.schedule("*/5 * * * *", pingServer);
