const User = require("../models/user.model");
const mongoose = require("mongoose");
const createError = require("../utils/error");
// get all Users
const getUsers = async (req, res, next) => {
  try {
    const user = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(user);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
//get single user
const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, "No such user found"));
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
//create a user
const createUser = async (req, res) => {
  const { email, phoneNumber, UserDate, isAdmin } = req.body; //! UserDate
  //add doc to database
  try {
    const user = await User.create({
      email,
      phoneNumber,
      UserDate,
      isAdmin,
    });
    res.status(200).json(user);
    console.log(user.isAdmin);
    console.log(user);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, "No such user found"));
    }

    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
// update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, "User not found"));
    }
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body, //*$set: req.body,
      } //*{new: true}
    );
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
