import { useState, useEffect } from "react";
import axios from "axios";
import "./Review.css";
import { API_BASE_URL } from "../../config.js";

const Reviews = ({ shopId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/reviews/${shopId}`
        );
        setReviews(response.data);
        calculateAverageRating(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [shopId]);

  const calculateAverageRating = (reviews) => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / reviews.length || 0;
    setAverageRating(average);
    setTotalReviews(reviews.length);
  };

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available for this shop.</p>
      ) : (
        <div>
          <h2>
            Average Rating: {averageRating.toFixed(1)} (Total Reviews:{" "}
            {totalReviews})
          </h2>
          <div className="users-reviews">
            {reviews.map((review) => (
              <div
                className="user-review"
                key={review._id}
                style={{ marginBottom: "10px" }}
              >
                <h4>
                  {review.user} <br />
                </h4>
                {review.text}
                <div>
                  {" "}
                  Rating:{" "}
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
