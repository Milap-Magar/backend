const express = require("express");
const loggedIn = require("../middleware/loggedIn.middleware");
const router = express.Router();

router.get("/", loggedIn, (req, res) => {
  if (req.admin) {
    res.render("index", { status: 200, admin: req.admin });
  } else {
    res.render("index", { status: "404", admin: "Not Found" });
  }
});
router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "/public" });
});
router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "/public/" });
});

module.exports = router;
