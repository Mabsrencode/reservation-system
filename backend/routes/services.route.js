const express = require("express");
const router = express.Router();

const Services = require("../models/services.model");
const Carwash = require("../models/carwash.model");
//get all services
router.get("/services/auto-detailing", async (req, res) => {
  try {
    const services = await Services.find({});
    res.status(200).send(services);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});
// booking single
router.post("/auto-detailing/book/:_id", async (req, res) => {
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
    res.send(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//delete
router.post("/delete-service", async (req, res) => {
  const { serviceId } = req.body;
  try {
    const service = await Services.findOne({ _id: serviceId });
    const carwash = await Carwash.findOne({ _id: serviceId });

    if (service) {
      console.log("Deleting Service:", service);

      await service.deleteOne();
    } else if (carwash) {
      console.log("Deleting Service:", service);

      await carwash.deleteOne();
    } else if (!service || !carwash) {
      return res.status(404).json({ error: "Service not found" });
    }

    // console.log("Deleting Service:", service);

    // await service.deleteOne();

    console.log("Service deleted successfully");

    res.send("Service deleted successfully");
  } catch (error) {
    console.error("Delete Service Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//*UPDATE

router.post("/update-service", async (req, res) => {
  try {
    const { serviceId, updatedServiceData } = req.body;

    const service = await Services.findOneAndUpdate(
      { _id: serviceId },
      { $set: updatedServiceData },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    } else {
      console.log("Successfully updated service");
    }

    res.status(200).send(service);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

//!car wash

router.get("/services/carwash-package", async (req, res) => {
  try {
    const services = await Carwash.find({});
    res.status(200).send(services);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.post("/update-service/carwash", async (req, res) => {
  try {
    const { serviceId, updatedServiceData } = req.body;

    const carwash = await Carwash.findOneAndUpdate(
      { _id: serviceId },
      { $set: updatedServiceData },
      { new: true }
    );

    if (!carwash) {
      return res.status(404).json({ error: "Service not found" });
    } else {
      console.log("Successfully updated service");
    }

    res.status(200).send(carwash);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/carwash/book/:_id", async (req, res) => {
  try {
    const serviceId = req.params._id;
    const service = await Carwash.findById(serviceId);
    res.status(200).send(service);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.post("/add-services/carwash", async (req, res) => {
  try {
    const newCarwash = new Carwash(req.body);
    const user = await newCarwash.save();
    res.send(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
module.exports = router;
