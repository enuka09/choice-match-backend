const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/create", productController.createProduct);
router.get("/find-by-id/:id", productController.findProductById);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete-by-id/:id", productController.deleteProduct);
router.get("/find-all", productController.findAllProducts);
router.get("/find-all-count", productController.findProductCount);
router.get("/find-all-min", productController.findAllMin);

module.exports = router;
