const express = require("express");
const { loggedIn } = require("../middleware/admin.middleware");
const {
  login,
  logout,
  // isAdmin,
  register,
} = require("../controllers/admin.controllers");
// const { isUser } = require("../controllers/user.controllers");
// const { getAllAdmins } = require("../model/admin.model");
// const { getAllUsers } = require("../model/user.model");
const router = express.Router();

router.get("/api/loggedin", loggedIn);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
