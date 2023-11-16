import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";

import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate form fields
    if (!username.trim()) {
      setUsernameError("Please enter your username");
      return;
    } else {
      setUsernameError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      return;
    } else {
      setPasswordError("");
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        username,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/home");
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
      <div className="form-div">
        <h1>Login</h1>

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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!password && <label>{splitTextIntoSpans("Password")}</label>}
          </div>

          <button className="login-btn" type="button" onClick={handleLogin}>
            Login
          </button>
          <p>
            {usernameError}
            {passwordError}
          </p>
        </form>
      </div>
      <p className="error-msg">{error}</p>
    </div>
  );
};

export default LoginForm;
