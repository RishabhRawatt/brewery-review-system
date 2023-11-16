import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";
import { useNavigate } from "react-router-dom";

import "./Signup.css";

const SignupForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignup = async () => {
    // Validate form fields
    if (!username.trim()) {
      setUsernameError("Please enter a username");
      return;
    } else {
      setUsernameError("");
    }

    if (!email.trim()) {
      setEmailError("Please enter your email");
      return;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter a password");
      return;
    } else {
      setPasswordError("");
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/user/register`, {
        username,
        email,
        password,
      });

      console.log(response.data);
      setSuccessMessage("Signup successful! login now");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const splitTextIntoSpans = (text) => {
    return text.split("").map((letter, idx) => (
      <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
        {letter}
      </span>
    ));
  };

  return (
    <div className="page-div">
      <div className="sform-div">
        <h1>Signup</h1>
        <form className="form-data">
          <div className="form-control">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {!username && <label>{splitTextIntoSpans("Username")}</label>}
          </div>

          <div className="form-control">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!email && <label>{splitTextIntoSpans("Email")}</label>}
          </div>

          <div className="form-control">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!password && <label>{splitTextIntoSpans("Password")}</label>}
          </div>

          <button className="login-btn" type="button" onClick={handleSignup}>
            Signup
          </button>
          <p>
            {usernameError} {emailError} {passwordError}
          </p>
        </form>
      </div>
      {error && <p className="error-msg">{error}</p>}
      {successMessage && <p className="success-msg">{successMessage}</p>}
    </div>
  );
};

export default SignupForm;
