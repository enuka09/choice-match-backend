const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/subCategoryController");
const authJwt = require("../middleware/authJwt");

router.post("/create", authJwt(), subCategoryController.createSubCategory);
router.get("/find-by-id/:id", authJwt(), subCategoryController.findSubCategoryById);
router.put("/update/:id", authJwt(), subCategoryController.updateSubCategory);
router.delete("/delete-by-id/:id", authJwt(), subCategoryController.deleteSubCategory);
router.get("/find-all", subCategoryController.findAllSubCategories);
router.get("/find-all-count", authJwt(), subCategoryController.findSubCategoryCount);
router.get("/find-by-main-category/:categoryName", subCategoryController.findByMainCategoryName);

module.exports = router;
