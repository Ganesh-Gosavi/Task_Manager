const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyJwtToken = require("../middlewares/authMiddleware");

// This endpoint is created to register the user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate request body
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    // Check if user already exists
    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const userData = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const userResponse = await userData.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: userResponse._id },
      process.env.SECRET_KEY
    );

    // Respond with success message and token
    res.json({
      message: "User registered successfully",
      token: token,
      username: name,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
});

// This endpoint is created to login the user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        message: "Bad Request! Invalid Credentials",
      });
    }

    // Find user by email
    const userDetails = await User.findOne({ email });

    // Check if user exists
    if (!userDetails) {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    // Check if passwords match
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: userDetails._id }, process.env.SECRET_KEY);

    // Respond with success message and token
    res.json({
      message: "User logged in successfully",
      token: token,
      username: userDetails.name,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
});

// This endpoint is created to update the user password or name
router.put("/settings/update", verifyJwtToken, async (req, res) => {
  try {
    const userId = req.body.userId;
    const { name, password } = req.body;

    // Validate request body
    if (!name && !password) {
      return res.status(401).json({
        message: "Bad Request",
        success: false,
      });
    }

    // Find user by ID
    const userDetails = await User.findById(userId);

    // Check if user exists
    if (!userDetails) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update name if provided
    if (name) {
      userDetails.name = name;
    }

    // Update password if provided and valid
    if (password && password.oldPassword && password.newPassword) {
      const isMatch = await bcrypt.compare(
        password.oldPassword,
        userDetails.password
      );

      // Check if old password matches
      if (!isMatch) {
        return res.status(400).json({
          message: "Old password is incorrect",
          success: false,
        });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password.newPassword, 10);

      userDetails.password = hashedPassword;
    }

    // Save updated user details
    await userDetails.save();
    res.json({
      message: "User information updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
