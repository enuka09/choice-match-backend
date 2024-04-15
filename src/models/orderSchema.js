const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    required: true,
  },
  shippingDetails: {
    type: Object,
    required: true,
  },
  billingDetails: {
    type: Object || String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    status: { type: String, default: "Pending", enum: ["Pending", "Shipped", "Delivered", "Cancelled"] },
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
