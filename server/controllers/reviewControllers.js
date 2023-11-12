const Review = require("../models/review.js");

const getAllReviews = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const reviews = await Review.find({ shopId });
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
};

const addReview = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const { user, rating, text } = req.body;

    const newReview = new Review({
      shopId,
      user,
      rating,
      text,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add the review." });
  }
};

module.exports = {
  getAllReviews,
  addReview,
};
