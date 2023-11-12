import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navigate to the login component
    navigate("/login");
  };

  const handleSignupClick = () => {
    // Navigate to the signup component
    navigate("/signup");
  };

  return (
    <div className="div-login">
      <h1 className="login-h1">READY TO FIND YOUR BREW</h1>

      <div className="welcome-btn">
        <button className="btn-logout" onClick={handleLoginClick}>
          Login
        </button>
        <button className="btn-logout" onClick={handleSignupClick}>
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Welcome;
