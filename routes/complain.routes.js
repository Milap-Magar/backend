const express = require("express");
// const { loggedIn } = require("../middleware/admin.middleware");
const { complain } = require("../controllers/complain.controllers");

const complainRouter = express.Router();

complainRouter.post("/complain", complain);

module.exports = complainRouter;
