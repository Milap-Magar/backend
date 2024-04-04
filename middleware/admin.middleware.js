const db = require("../config/database.config");
const jwt = require("jsonwebtoken");

exports.loggedIn = async (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const sql = "SELECT * FROM admins";
    console.log(sql);
    await db.query(sql, [decoded.id], (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return next(err);
      }
      if (result.length > 0) {
        const userData = result[0];
        console.log(userData);
        res.json(userData);
      } else {
        console.error("No user found with ID:", decoded.id);
        res.redirect("/login");
      }
    });
  } catch (err) {
    console.error("Error decoding token:", err);
    return next(err);
  }
};
