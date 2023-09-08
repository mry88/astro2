const { Feature } = require("../models/features");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const fn = req.query.name;
  try {
    let features;

    if (fn) {
      features = await Feature.find({
        name: fn,
      }).sort({ _id: -1 });
    } else {
      features = await Feature.find().sort({ _id: -1 });
    }

    res.status(200).send(features);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new feature item
router.post("/", async (req, res) => {
  try {
    // Extract the data for the new feature item from the request body
    const { name, description, price } = req.body;

    // Create a new feature instance
    const feature = new Feature({
      name,
      description,
      price,
    });

    // Save the feature to the database
    const savedFeature = await feature.save();

    // Respond with the saved feature
    res.status(201).json(savedFeature);
  } catch (error) {
    console.error("Error creating feature:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
      // Extract the data for the updated feature item from the request body
      const { name, description, price } = req.body;

      // Find the feature item by ID
      const feature = await Feature.findById(req.params.id);

      if (!feature) {
          return res.status(404).json({ message: "Feature not found" });
      }

      // Update the feature item properties
      feature.name = name;
      feature.description = description;
      feature.price = price;

      // Save the updated feature to the database
      const updatedFeature = await feature.save();

      // Respond with the updated feature
      res.status(200).json(updatedFeature);
  } catch (error) {
      console.error("Error updating feature:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;