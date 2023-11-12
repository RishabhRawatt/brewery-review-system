import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Reviews from "../Review/Reviews";
import AddReviewForm from "../ReviewForm/AddReviewForm";

import "./BreweryDetails.css";

const BreweryDetails = () => {
  // Use the useParams hook to get the "id" parameter from the URL
  let { id } = useParams();

  const [brewData, setBrewData] = useState([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const idUrl = `https://api.openbrewerydb.org/v1/breweries/${id}`;

    axios
      .get(idUrl)
      .then((response) => {
        setBrewData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [id]);

  //deconstruct
  const {
    name,
    brewery_type,
    address_1,
    city,
    state,
    postal_code,
    country,
    phone,
    website_url,
  } = brewData;

  const handleReviewButtonClick = () => {
    setIsReviewOpen(!isReviewOpen);
  };

  const handleReviewSubmit = (newReview) => {
    // Update the reviews state with the new review
    setReviews([...reviews, newReview]);
  };

  return (
    <div>
      <div>
        <div className="container-deatails">
          <div className="card">
            <div
              className="card-body"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="top-details">
                <h1 className="card-title">{name}</h1>
                <h3 className="card-brew-type">{brewery_type}</h3>
              </div>
              <p className="card-address">
                {" "}
                {address_1} , {city} , {state}, {postal_code}
              </p>

              <p className="card-country">{country}</p>
              <p className="card-contact">Contact No:- {phone}</p>
              <p className="card-link">
                <a href={website_url} target="_blank" rel="noopener noreferrer">
                  {website_url}
                </a>
              </p>
            </div>
          </div>
        </div>

        <button className="review-btn" onClick={handleReviewButtonClick}>
          {isReviewOpen ? "Close Review" : "Add a Review"}
        </button>
        {isReviewOpen && (
          <AddReviewForm
            shopId={id}
            onClose={handleReviewButtonClick}
            onReviewSubmit={handleReviewSubmit}
          />
        )}
      </div>
      {/* reviews */}
      <Reviews shopId={id} />
    </div>
  );
};

export default BreweryDetails;
