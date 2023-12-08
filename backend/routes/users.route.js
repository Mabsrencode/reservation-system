const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    res.status(200).send("User Registered Successfully");
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const userData = {
        name: user.name,
        email: user.email,
        tel: user.tel,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.send(userData);
    } else {
      res.status(404).json({ message: "Sign In Failed" });
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});
module.exports = router;
