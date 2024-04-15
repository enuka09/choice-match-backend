const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authJwt = require("../middleware/authJwt");

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/find-by-id/:id", authJwt(), userController.findUserById);
router.delete("/delete-by-id/:id", authJwt(), userController.deleteUser);
router.get("/find-all", authJwt(), userController.findAllUsers);
router.get("/find-all-count", authJwt(), userController.findUserCount);

module.exports = router;
