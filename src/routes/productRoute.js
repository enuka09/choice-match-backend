const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const authJwt = require("../middleware/authJwt");

router.post("/create", authJwt(), productController.createProduct);
router.get("/find-by-id/:id", productController.findProductById);
router.put("/update/:id", authJwt(), productController.updateProduct);
router.delete("/delete-by-id/:id", authJwt(), productController.deleteProduct);
router.get("/find-all", productController.findAllProducts);
router.get("/find-all-count", productController.findProductCount);
router.get("/find-all-min", authJwt(), productController.findAllMin);
router.get("/find-all-featured", productController.findAllFeaturedProducts);

module.exports = router;
