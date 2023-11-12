import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // State to store user inputs
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Get the stored token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://localhost:3000/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;

        setUsername(userData.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    let apiUrl = "https://api.openbrewerydb.org/v1/breweries?";
    if (name) {
      apiUrl += `by_name=${name}`;
    }
    if (city) {
      apiUrl += `${name ? "&" : ""}by_city=${city}`;
    }
    if (type) {
      apiUrl += `${name || city ? "&" : ""}by_type=${type}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        // Update the search results with the response data
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = async () => {
    try {
      //  Remove user's
      localStorage.removeItem("token");

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="home-bg">
      <div className="home-container">
        <h1 className="username-home">
          Welcome <br /> {username}
        </h1>
        <img className="home_img" src="./logo.jpg" alt="" />
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1 className="home-h1">Find your Brew Here</h1>

      {/*  Name, City, and Type */}
      <div className="home-input">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Type (Any)</option>
          <option value="micro">Micro</option>
          <option value="nano">Nano</option>
          <option value="regional">Regional</option>
          <option value="brewpub">Brewpub</option>
          <option value="large">Large</option>
          <option value="planning">Planning</option>
          <option value="bar">Bar</option>
          <option value="contract">Contract</option>
          <option value="proprietor">Proprietor</option>
          <option value="closed">Closed</option>
        </select>
        <button className="home-btn" onClick={handleSearch}>
          Search🍺
        </button>
      </div>

      {/* search results */}
      <div>
        <h2 className="search-result-h2">Search Results</h2>

        <ol className="search-results-list">
          {searchResults.map((result) => (
            <li key={result.id}>
              <div className="search-results">
                <Link className="link-card" to={`/brewery/${result.id}`}>
                  <div className="card">
                    <div className="card-body">
                      <div className="brew-details">
                        <h3 className="card-title">{result.name}</h3>
                        <h4 className="card-subtitle">
                          {result.brewery_type.toUpperCase()}
                        </h4>
                      </div>
                      <h4 className="card-city">{result.city}</h4>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Home;
