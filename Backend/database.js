require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  }
};

module.exports = connectDB;
