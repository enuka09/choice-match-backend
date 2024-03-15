const express = require("express");
const mainCategoryController = require("../controllers/mainCategoryController");
const router = express.Router();

router.post("/create", mainCategoryController.createMainCategory);
router.get("/find-by-id/:id", mainCategoryController.findMainCategoryById);
router.put("/update/:id", mainCategoryController.updateMainCategory);
router.delete("/delete-by-id/:id", mainCategoryController.deleteMainCategory);
router.get("/find-all", mainCategoryController.findAllMainCategories);
router.get("/find-all-count", mainCategoryController.findMainCategoryCount);

module.exports = router;
