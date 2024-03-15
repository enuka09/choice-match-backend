const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  customerDetails: {
    type: Object,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  paymentDetails: {
    type: Object,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
