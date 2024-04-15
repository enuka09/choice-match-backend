const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const authJwt = require("../middleware/authJwt");

router.post("/create", authJwt(), brandController.createBrand);
router.get("/find-by-id/:id", brandController.findBrandById);
router.put("/update/:id", authJwt(), brandController.updateBrand);
router.delete("/delete-by-id/:id", authJwt(), brandController.deleteBrand);
router.get("/find-all", brandController.findAllBrands);
router.get("/find-all-count", authJwt(), brandController.findBrandCount);

module.exports = router;
