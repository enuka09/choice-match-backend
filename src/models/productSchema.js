const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  mainCategory: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: [
    {
      type: String,
      required: true,
    },
  ],
  size: [
    {
      type: String,
      required: true,
    },
  ],
  qtyOnHand: {
    type: Number,
    required: true,
    min: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

module.exports = mongoose.model("Product", productSchema);
