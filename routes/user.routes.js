const express = require("express");
const { loggedIn } = require("../middleware/user.middleware");
const {
  login,
  logout,
  isUser,
  register,
  isUser,
} = require("../controllers/user.controllers");
const { getAllUsers } = require("../model/user.model");
const router = express.Router();

// router.get("/api/loggedin", loggedIn, isUser, getAllUsers);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
