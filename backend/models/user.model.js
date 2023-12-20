const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tel: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.methods.updateFullName = async function (newFullName) {
  this.name = newFullName;
  await this.save();
};
userSchema.methods.updateEmail = async function (newEmail) {
  this.email = newEmail;
  await this.save();
};
userSchema.methods.updatePhoneNumber = async function (newPhoneNumber) {
  this.tel = newPhoneNumber;
  await this.save();
};
userSchema.methods.updatePassword = async function (newPassword) {
  this.password = newPassword;
  await this.save();
};
module.exports = mongoose.model("Users", userSchema);
