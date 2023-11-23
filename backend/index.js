require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bookingRoute = require("./routes/booking.route");
const usersRoute = require("./routes/users.route");
const authRoute = require("./routes/auth.route");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const port = process.env.PORT;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorMessage,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const uri = process.env.DBURL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen();
  })
  .catch((error) => {
    console.error(error);
  });

mongoose.connection.on("disconnect", () => {
  console.log("Mongoose Connection Disconnected");
});
// const User = mongoose.model("User", userSchema);
// app.post("/signup", async (req, res) => {
//   const { email, phoneNumber, password } = req.body;

//   if (!email || !phoneNumber || !password) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//   const user = new User({
//     email,
//     phoneNumber,
//     password,
//   });
//   await user.save();
//   res.status(201).json({ message: "User created successfully" });
// });
