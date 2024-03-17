const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/find-by-id/:id", userController.findUserById);
router.delete("/delete-by-id/:id", userController.deleteUser);
router.get("/find-all", userController.findAllUsers);
router.get("/find-all-count", userController.findUserCount);

module.exports = router;
