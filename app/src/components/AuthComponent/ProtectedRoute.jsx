import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Checking if JWT is present in localStorage or your preferred storage
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to the login page if JWT is not present
      navigate("/login");
    }
  }, [navigate]);

  // Render the protected components if authentication is successful
  return <>{children}</>;
};

export default ProtectedRoute;
