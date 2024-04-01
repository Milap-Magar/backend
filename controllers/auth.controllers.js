const express = require('express');
const register =require("./register.controllers");
const login =require("./login.controllers");
// const logout =require("./logout");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/register", logout);

module.exports = router;