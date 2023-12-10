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

router.post("/add-services", async (req, res) => {
  try {
    const newServices = new Services(req.body);
    const user = await newServices.save();
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//delete
router.post("/delete-service", async (req, res) => {
  const { serviceId } = req.body;
  try {
    const service = await Services.findOne({ _id: serviceId });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    console.log("Deleting Service:", service);

    await service.deleteOne();

    console.log("Service deleted successfully");

    res.send("Service deleted successfully");
  } catch (error) {
    console.error("Delete Service Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
