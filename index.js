const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require('dotenv').config();
const authRoutes = require("./src/Route/auth");
const postRoutes = require("./src/Route/post");

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI,
    {}
  )
  .then(() => {
    console.log("MongoDb Connection");
  })
  .catch((err) => {
    console.error(err);
  });

// Routes setup
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


// Passport middleware setup
app.use(passport.initialize());

// Server listening
const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
