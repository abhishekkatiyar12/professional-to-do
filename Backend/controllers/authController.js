const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register
exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Validate phone number (10 digits, India format for example)
    const phoneRegex = /^[6-9]\d{9}$/; 
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // ✅ Check if email already exists (case insensitive)
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // ✅ Check if phone already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number is already registered" });
    }

    // ✅ Create new user
    const user = await User.create({ 
      name, 
      email: email.toLowerCase(), 
      password, 
      phone 
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};



// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.profile = async (req, res) => {
  try {
    // req.user is already set by protect middleware
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(req.user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
exports.updateprofile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Find the logged-in user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Check email uniqueness if updating
    if (email && email.toLowerCase() !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({ message: "Email is already registered" });
      }
      user.email = email.toLowerCase();
    }

    // ✅ Check phone uniqueness if updating
    if (phone && phone !== user.phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ message: "Phone number is already registered" });
      }

      // Validate phone format (10-digit Indian format)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number format" });
      }

      user.phone = phone;
    }

    // ✅ Update only allowed fields
    if (name) user.name = name;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
