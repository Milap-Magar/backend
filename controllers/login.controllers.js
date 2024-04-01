const jwt = require("jsonwebtoken");
const pool = require("../config/database.config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password: pswd } = req.body;
  const sql = "SELECT * FROM admins WHERE email=?";
  if (!email)
    return req.json({
      status: 204,
      error: "Please enter the email & password",
    });
  else {
    pool.query(sql, [email], async (err, result) => {
      if (err) throw err;
      if (!result[0] || !(await bcrypt.compare(password, result[0].password)))
        return res.json({
          status: 404,
          error: "Incorrect Email or Password",
        });
      else {
        const token = jwt.sign(
          { id: result[0].id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: process.env.JWT_EXPIRES,
          }
        );
        const cookieOptions = {
          expiresIn: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
        res.cookie("adminRegistered", token, cookieOptions);
        return res.json({ status: 200, success: "User has been logged in" });
      }
    });
  }
};

module.exports = login;
