const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser')

// Route 1: user signup
router.post(
  "/register",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Create a password of length 5 - 16 alphabets").isLength({
      min: 5,
      max: 16,
    }),
  ],
  async (req, res) => {
    const { name, email, password, role } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    try {
      // Check if the email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }
      //if error return Bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create and save the user
      user = await User.create({
        name,
        email,
        password: secPass,
        role,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      return res.status(201).json({
        message: "User registered successfully",
        authToken: authToken,
      });
    } catch (error) {
      console.error("Error while registering: ", error);
      return res.status(500).json({ message: "Server error" }); // Send error response here
    }
  }
);

// Route 2: Authenticate user while logging in
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if error return Bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to Login with correct credentials " });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to Login with correct credentials " });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error("Error while Login : ", error.message);
      return res.status(500).send("Internal Server error occured"); // Send error response here
    }
  }
);

// Route 3: Get loggedin user detail
router.post("/getUser",fetchuser,async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error"); // Send error response here
    }
  }
);
module.exports = router;
