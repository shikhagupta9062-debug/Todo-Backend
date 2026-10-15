const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const dns = require("dns");


dotenv.config();

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/TodoRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "MERN Todo API is running",
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Todo routes
app.use("/api/todos", todoRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });