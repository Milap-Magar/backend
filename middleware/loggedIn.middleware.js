const pool = require("../config/database.config");
const jwt = require("jsonwebtoken");

const loggedIn = async (req, res) => {
  if (!req.cookies.userRegistered) return next();
  try {
    const sql = 'SELECT * FROM admins WHERE id= ?' ;
    const decoded = jwt.verify(req.cookies.adminRegistered, process.env.JWT_SECRET_KEY);
    pool.query(sql, [decoded.id], (err, result)=>{
        if(err) throw next();
        req.admin = result[0];
        return next();
    })
  } catch (err) {
    if (err) return next();
  }
};

module.exports = loggedIn;
