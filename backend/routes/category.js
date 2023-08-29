const { Category } = require("../models/category");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");

const router = require("express").Router();

router.get("/", async (req, res) => {
    const fn = req.query.name;
    try {
      let category;
  
      if (fn) {
        category = await Category.find({
          name: fn,
        }).sort({ _id: -1 });
      } else {
        category = await Category.find().sort({ _id: -1 });
      }
  
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;