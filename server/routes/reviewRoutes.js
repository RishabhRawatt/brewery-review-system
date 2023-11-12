const express = require("express");
const router = express.Router();
const reviewControllers = require("../controllers/reviewControllers");

// GET all reviews for a specific shop
router.get("/api/reviews/:shopId", reviewControllers.getAllReviews);

// POST a new review for a specific shop
router.post("/api/reviews/:shopId", reviewControllers.addReview);

module.exports = router;
