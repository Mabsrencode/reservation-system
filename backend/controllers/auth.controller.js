require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, email, phone_number, password } = req.body;
  if (username == "" || email == "" || phone_number == "" || password == "") {
    return next(createError(400, "Fill all required fields."));
  } else {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hash,
      });
      await newUser.save();
      res.status(200).send(newUser);
      console.log(newUser);
    } catch (err) {
      // res.status(400).json({ error: error.message });
      // console.error(error);
      // next(createError(400, "Fill all required fields."));
      next(err);
      console.log(err);
    }
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (username == "" || password == "") {
    return next(createError(400, "Fill all required fields."));
  } else {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found"));

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username"));

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );

      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ ...otherDetails });
      console.log(user);
    } catch (err) {
      // res.status(400).json({ error: error.message });
      // console.error(error);
      next(err);
      console.log(err);
    }
  }
};

module.exports = { register, login };
