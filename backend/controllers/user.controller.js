const User = require("../models/user.model");
const mongoose = require("mongoose");
// get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};
//get single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user found" });
  }
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
};
//create a user
const createUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  //add doc to database
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });
    res.status(200).json(user);
    console.log(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user found" });
  }

  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
};
// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found" });
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
