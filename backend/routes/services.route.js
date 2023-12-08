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

router.post("/services/book/:_id", async (req, res) => {
  try {
    const serviceId = req.params._id;
    const service = await Services.findById(serviceId);
    res.status(200).send(service);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

module.exports = router;
