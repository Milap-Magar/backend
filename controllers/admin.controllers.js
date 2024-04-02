const jwt = require("jsonwebtoken");
const db = require("../config/database.config");
const bcrypt = require("bcryptjs");
// const expressSession = require("express-session");

exports.isAdmin = async (req, res) => {
  if (!req.admin) {
    return res.redirect("/login");
  } else {
    if (req.admin.role === "admin") {
      return res.redirect("/admin-dashboard");
    } else {
      return res.redirect("/login");
    }
  }
};

exports.login = async (req, res) => {
  const { email, password: pswd } = req.body;
  const sql = "SELECT * FROM admins WHERE email=?";
  if (!email)
    return res.json({
      status: 204,
      error: "Please enter the email & password",
    });
  else {
    db.query(sql, [email], async (err, result) => {
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
        return res.json({ status: 200, success: "Admin has been logged in" });
      }
    });
  }
};

exports.register = async (req, res) => {
  const { email, password: pswd } = req.body;
  const sql = "SELECT email FROM admins WHERE email = ?";
  const sql_insert = "INSERT into admins SET ?";

  if (!email || !pswd)
    return res.status(400).json({ error: "Please enter email and password" });

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result[0]) {
      return res
        .status(409)
        .json({ error: "Email has already been registered!" });
    }
    try {
      const hashedPassword = await bcrypt.hash(pswd, 8);
      await db.query(sql_insert, {
        email: email,
        password: hashedPassword,
      });
      return res.status(200).json({ success: "User has been registered" });
    } catch (error) {
      console.error("Error while registering user:", error);
      return res.status(500).json({ error: "Error while registering user" });
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("adminRegistered");
  res.redirect("/");
};
