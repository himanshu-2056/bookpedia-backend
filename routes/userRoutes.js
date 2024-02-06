const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");

// User registration route
router.post("/register", register);
router.post("/login", login);

module.exports = router;
