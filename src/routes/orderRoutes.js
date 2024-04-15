const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authJwt = require("../middleware/authJwt");

router.post("/create", orderController.createOrder);
router.get("/find-by-id/:id", orderController.findOrderById);
router.put("/update/:id", authJwt(), orderController.updateOrder);
router.delete("/delete-by-id/:id", authJwt(), orderController.deleteOrder);
router.get("/find-all", orderController.findAllOrders);
router.get("/find-all-count", authJwt(), orderController.findOrderCount);
router.post("/create-payment", orderController.createPayment);

module.exports = router;
