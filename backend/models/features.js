const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true }
    },
    { timestamps: true }
  );
  
  const Feature = mongoose.model("Feature", featureSchema);
  exports.Feature = Feature;