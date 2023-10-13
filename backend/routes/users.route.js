const express = require("express");
const {
  getUsers,
  getUser,
  //   createUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");
const router = express.Router();

// router.get("/authenticating", verifyToken, (req, res, next) => {
//     res.send("hello user, you are authenticated")
// })

// router.get("/check-user/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete your account");
// });
// router.get("/check-admin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello ADMIN, you are logged in and you can delete ALL accounts");
// });

router.get("/", verifyAdmin, getUsers);

router.get("/:id", verifyUser, getUser);

// router.post("/", createUser);

router.delete("/:id", verifyUser, deleteUser);

router.patch("/:id", verifyUser, updateUser);

module.exports = router;
