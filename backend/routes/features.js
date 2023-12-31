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

module.exports = router;