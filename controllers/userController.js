const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, profilePicture } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the given email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credential" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Credential" });
    }

    // Create and sign a JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { register, login };
