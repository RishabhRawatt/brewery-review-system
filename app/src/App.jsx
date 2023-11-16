import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/AuthComponent/ProtectedRoute.jsx";
import Home from "./components/Home/Home.jsx";
import BreweryDetails from "./components/BreweryDetails/BreweryDetails.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import SignupForm from "./components/Signup/SignupForm.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/brewery/:id"
          element={
            <ProtectedRoute>
              <BreweryDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
};

export default App;
