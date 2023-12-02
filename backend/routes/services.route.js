const express = require("express");
const router = express.Router();

const Services = require("../models/services.model");
//get all services
router.get("/services", async (req, res) => {
  try {
    const services = await Services.find({});
    res.status(200).send(services);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.post("/services/book/:id", async (req, res) => {
  try {
    const services = await Services.findOne({});
    res.status(200).send(services);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

module.exports = router;
