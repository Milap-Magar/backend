const db = require("../config/database.config");
const jwt = require("jsonwebtoken");

exports.loggedIn = async (req, res, next) => {
  if (!req.cookies.adminRegistered) {
    return res.redirect("/login");
  }
  try {
    const decoded = jwt.verify(req.cookies.adminRegistered, process.env.JWT_SECRET_KEY);
    const sql = 'SELECT * FROM admins WHERE id = ?';
    db.query(sql, [decoded.id], (err, result) => {
      if (err) return next(err); 
      req.admin = result[0];
      next(); 
    });
  } catch (err) {
    return next(err);
  }
};

