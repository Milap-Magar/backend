const express = require("express");
// const pool = require("./config/database.config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/", require("./routes/page.routes"));
app.use("/api", require("./controllers/auth.controllers"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 3306;

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/js", express.static(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(PORT, (req, res) => {
  console.log(`🚀 ~ Listening to Port no. ${PORT}`);
});
