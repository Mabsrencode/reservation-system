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
  if (email === "" || password === "") {
    return res
      .status(401)
      .json({ message: "Please enter all required fields" });
  }
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

router.put("/update-fullname/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newFullName = req.body.newFullName;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.updateFullName(newFullName);
    res.status(200).json({ message: "Full Name updated successfully" });
  } catch (error) {
    console.error("Error updating full name:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-email/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newEmail = req.body.newEmail;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.updateEmail(newEmail);
    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/update-phonenumber/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newPhoneNumber = req.body.newPhoneNumber;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.updatePhoneNumber(newPhoneNumber);
    res.status(200).json({ message: "Phone Number updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/update-password/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newPassword = req.body.newPassword;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.updatePassword(newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//delete account
router.delete("/delete-account/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
