const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email is already in use
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the User model
    const user = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    // Respond with a success message or other relevant data
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle errors, such as validation errors or database errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Finding the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    //  password check
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // JWT token
    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// clear the token on the client side) logout
const logoutUser = (req, res) => {
  res.json({ message: "Logout successful" });
};

const fetchUserName = (req, res) => {
  try {
    const username = req.user.username;

    res.json({ username });
  } catch (error) {
    console.error("Error fetching username:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const isAuthenticated = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tokenParts = tokenHeader.split(" ");

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  fetchUserName,
  isAuthenticated,
};
