const express = require("express");
const router = express.Router();
const { register, login,profile ,updateprofile,forgotPassword,resetPassword} = require("../controllers/authController");
const {protect} =require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
// to get the profile
router.get("/profile",protect, profile);

// to update the profile
router.put("/profile", protect, updateprofile);

router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

module.exports = router;
