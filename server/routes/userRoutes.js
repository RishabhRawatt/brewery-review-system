const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers.js");
const jwt = require("jsonwebtoken");

// Register a new user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", userController.loginUser);

// Logout a user
router.post("/logout", userController.logoutUser);

//get user info
router.get("/me", userController.isAuthenticated, userController.fetchUserName);

module.exports = router;
