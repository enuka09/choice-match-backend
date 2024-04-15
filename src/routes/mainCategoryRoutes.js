const express = require("express");
const router = express.Router();
const mainCategoryController = require("../controllers/mainCategoryController");
const authJwt = require("../middleware/authJwt");

router.post("/create", authJwt(), mainCategoryController.createMainCategory);
router.get("/find-by-id/:id", mainCategoryController.findMainCategoryById);
router.put("/update/:id", authJwt(), mainCategoryController.updateMainCategory);
router.delete("/delete-by-id/:id", mainCategoryController.deleteMainCategory);
router.get("/find-all", authJwt(), mainCategoryController.findAllMainCategories);
router.get("/find-all-count", authJwt(), mainCategoryController.findMainCategoryCount);

module.exports = router;
