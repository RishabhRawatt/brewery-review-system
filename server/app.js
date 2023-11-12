const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const reviewRoutes = require("./routes/reviewRoutes");

const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI);

// Middleware
app.use(bodyParser.json());

// Use the review routes
app.use("/", reviewRoutes);
app.use("/user", userRoutes);

//schema
const review = require("./models/review");

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
