const express = require("express");
const brandController = require("../controllers/brandController");
const router = express.Router();

router.post("/create", brandController.createBrand);
router.get("/find-by-id/:id", brandController.findBrandById);
router.put("/update/:id", brandController.updateBrand);
router.delete("/delete-by-id/:id", brandController.deleteBrand);
router.get("/find-all", brandController.findAllBrands);
router.get("/find-all-count", brandController.findBrandCount);

module.exports = router;
