const express = require("express");
const subCategoryController = require("../controllers/subCategoryController");
const router = express.Router();

router.post("/create", subCategoryController.createSubCategory);
router.get("/find-by-id/:id", subCategoryController.findSubCategoryById);
router.put("/update/:id", subCategoryController.updateSubCategory);
router.delete("/delete-by-id/:id", subCategoryController.deleteSubCategory);
router.get("/find-all", subCategoryController.findAllSubCategories);
router.get("/find-all-count", subCategoryController.findSubCategoryCount);
router.get("/find-by-main-category/:categoryName", subCategoryController.findByMainCategoryName);

module.exports = router;
