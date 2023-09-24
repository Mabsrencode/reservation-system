require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/users.route");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.path, req.body);

  next();
});

app.use("/api/users/", router);
// app.use("/api/admin/", router);

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
  .then((connection) => {
    console.log("MongoDB Connected", connection);
    app.listen(port, () => {
      console.log(`MongoDB Connected, Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
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
