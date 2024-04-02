const express = require("express");
const { loggedIn } = require("../middleware/loggedIn.middleware");
const { login, logout, isAdmin, register } = require("../controllers/admin.controllers");
const { getAllAdmins } = require("../model/admin.model");
const router = express.Router();

router.get("/api/admin", loggedIn, isAdmin, getAllAdmins);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
