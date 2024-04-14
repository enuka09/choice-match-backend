const orderSchema = require("../models/orderSchema");

// Create order
const createOrder = (req, resp) => {
  console.log("Received request to create order:", req.body);

  const order = new orderSchema({
    orderId: req.body.orderId,
    cartItems: req.body.cartItems,
    shippingDetails: req.body.shippingDetails,
    billingDetails: req.body.billingDetails,
    paymentMethod: req.body.paymentMethod,
    subtotal: req.body.subtotal,
    deliveryCharge: req.body.deliveryCharge,
    discount: req.body.discount,
    total: req.body.total,
    status: req.body.status,
    dateCreated: req.body.dateCreated || Date.now(),
  });
  order
    .save()
    .then(() => {
      resp.status(201).json({ message: "Order created successfully!" });
    })
    .catch(error => {
      return resp.status(500).json(error);
    });
};

// Find One Order
const findOrderById = (req, resp) => {
  orderSchema.findOne({ _id: req.params.id }).then(selectedObj => {
    if (selectedObj != null) {
      return resp.status(200).json(selectedObj);
    }
    return resp.status(404).json({ message: `Order with Id ${req.params.id} Not Found!` });
  });
};

// Update order
const updateOrder = async (req, resp) => {
  const updateData = await orderSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        orderStatus: req.body.orderStatus,
      },
    },
    { new: true },
  );
  if (updateData) {
    resp.status(200).json({ message: "Order Updated!" });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Order
const deleteOrder = async (req, resp) => {
  const deleteData = await orderSchema.findByIdAndDelete({ _id: req.params.id });
  if (deleteData) {
    resp.status(204).json({ message: "Order Deleted successfully!" });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find All Orders
const findAllOrders = (req, resp) => {
  try {
    const { searchText } = req.query;

    const query = {};
    if (searchText) {
      query.$text = { $search: searchText };
    }

    orderSchema.find(query).then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all Orders Count
const findOrderCount = (req, resp) => {
  try {
    orderSchema.countDocuments().then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Create payment
/* eslint-disable camelcase */
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const createPayment = async (req, res) => {
  const { products, orderId } = req.body;

  const lineItems = products.map(product => ({
    price_data: {
      currency: "lkr",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.unitPrice * 100),
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout/payment/success/${orderId}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/payment/cancel/${orderId}`,
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).send("Failed to create payment session");
  }
};

module.exports = {
  createOrder,
  findOrderById,
  updateOrder,
  deleteOrder,
  findAllOrders,
  findOrderCount,
  createPayment,
};
