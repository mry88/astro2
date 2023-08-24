const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Object, required: true },
<<<<<<< HEAD
=======
    features: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feature',
    }],
>>>>>>> main
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
