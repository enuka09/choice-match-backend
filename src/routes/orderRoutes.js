const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.post("/create", orderController.createOrder);
router.get("/find-by-id/:id", orderController.findOrderById);
router.put("/update/:id", orderController.updateOrder);
router.delete("/delete-by-id/:id", orderController.deleteOrder);
router.get("/find-all", orderController.findAllOrders);
router.get("/find-all-count", orderController.findOrderCount);
router.post("/create-payment", orderController.createPayment);

module.exports = router;
