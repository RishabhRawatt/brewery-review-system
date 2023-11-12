import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";

import "./AddReviewForm.css";

const AddReviewForm = ({ shopId, onClose, onReviewSubmit }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        // Make a request to the server to get user information
        const response = await axios.get(`${API_BASE_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the server responds with user data, including the username
        const userData = response.data;

        // Set the username state
        setUsername(userData.username);
      } catch (error) {
        // Handle error, e.g., token expiration, network issues, etc.
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/reviews/${shopId}`,
        {
          shopId,
          user: username,
          text,
          rating,
        }
      );

      // Handle successful submission
      console.log("Review submitted successfully:", response.data);

      // Close the review form
      onClose();

      // Notify parent component about the new review
      onReviewSubmit(response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      <h3>Write your beautiful review</h3>

      <div className="rating-box">
        <label className="label-review">
          Review:
          <textarea value={text} required onChange={handleTextChange} />
        </label>

        <div className="rating-div">
          <label className="label-review">
            Rating:
            <div className="rating-numbers">
              {[1, 2, 3, 4, 5].map((number) => (
                <span
                  key={number}
                  className={number <= rating ? "number selected" : "number"}
                  onClick={() => handleRatingClick(number)}
                >
                  🍺
                </span>
              ))}
            </div>
          </label>
        </div>
      </div>

      <button className="submit-rating" onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  );
};

export default AddReviewForm;
