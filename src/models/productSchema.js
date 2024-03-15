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
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainCategory",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
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
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
