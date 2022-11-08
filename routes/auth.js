const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth");

// POST - Register user
router.post("/register", authCtrl.registerUser);

// POST - Login JWT
router.post("/login", authCtrl.loginUser);

// POST - Refresh token
router.post("/refresh_token", authCtrl.refreshToken);

module.exports = router;
