const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("q-zone-api.onrender.com/register", register);
router.post("q-zone-api.onrender.com/login", login);

module.exports = router;
