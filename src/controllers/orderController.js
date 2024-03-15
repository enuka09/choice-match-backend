const orderSchema = require("../models/orderSchema");

// Create Order
const createOrder = (req, resp) => {
  const order = new orderSchema({
    date: req.body.date,
    customerDetails: req.body.customerDetails,
    products: req.body.products,
    totalCost: req.body.totalCost,
    discount: req.body.discount,
    paymentDetails: req.body.paymentDetails,
    orderStatus: req.body.orderStatus,
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
    const { searchText, page = 1, size = 10 } = req.query;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};
    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageNumber - 1) * pageSize;

    orderSchema
      .find(query)
      .limit(pageSize)
      .skip(skip)
      .then(response => {
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

module.exports = {
  createOrder,
  findOrderById,
  updateOrder,
  deleteOrder,
  findAllOrders,
  findOrderCount,
};
