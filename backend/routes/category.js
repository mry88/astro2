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

  // CREATE CATEGORY
router.post("/", async (req, res) => {
  try {
    // Extract the data for the new category item from the request body
    const { name, desc } = req.body;

    // Create a new category instance
    const category = new Category({
      name,
      desc,
    });

    // Save the category to the database
    const savedCategory = await category.save();

    // Respond with the saved category
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//EDIT CATEGORY
router.put("/:id", async (req, res) => {
  try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.category
        },
        { new: true }
        );
      res.status(200).json(updatedCategory);
  } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

//DELETE CATEGORY
router.delete("/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;