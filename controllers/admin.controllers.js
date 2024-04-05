const jwt = require("jsonwebtoken");
const db = require("../config/database.config");
const bcrypt = require("bcryptjs");
// const expressSession = require("express-session");

exports.isAdmin = async (req, res) => {
  if (!req.admin) {
    return res.redirect("/");
  } else {
    if (req.admin.role === "admin") {
      return res.redirect("/admin_dashboard");
    } else {
      return res.redirect("/login");
    }
  }
};
// admin
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        error: "Please provide both email and password",
      });
    }
    const sql = "SELECT * FROM admins WHERE email=?";
    db.query(sql, [email], async (err, results) => {
      // console.log(result);
      // console.log(result.name);
      if (err) {
        console.error("Database query error:", err);
        return;
      }
      if (results.length > 0) {
        const rows = results[0];
        console.log(password, rows.password);
        bcrypt.compare(password, rows.password, async (err, response) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              error: "Password Compare Error",
            });
          }
          // console.log(response);
          if (response) {
            const name = rows.name;
            const token = jwt.sign({ name }, process.env.JWT_SECRET_KEY, {
              expiresIn: process.env.JWT_EXPIRES,
            });

            res.cookie("token", token);

            return res.status(200).json({
              status: 200,
              success: "Logged in successfully",
              role: "isUser",
              token: token,
            });
          } else {
            return res.status(401).json({
              status: 401,
              message: "Incorrect password",
            });
          }
        });
      } else {
        return res.status(401).json({
          status: 401,
          error: "Email not found",
        });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: 500,
      error: "An error occurred while processing your request",
    });
  }
};

exports.register = async (req, res) => {
  const { email, password: pswd, symbol, dob, name, phone, address, faculty, semester, role } = req.body;
  console.log(req.body);
  if (role == "isAdmin") {
    if (!email || !pswd) {
      return res.status(400).json({ error: "Please enter email and password" });
    }

    const sql = "SELECT email FROM admins WHERE email = ?";
    const sql_insert =
      "INSERT INTO admins (email, password, name, phone, address, role) VALUES (?, ?, ?, ?, ?, '?')";

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
        const adminData = [email, hashedPassword, name, phone, address]; // Values array
        await db.query(sql_insert, adminData);
        return res.status(200).json({ success: "admin has been registered" });
      } catch (error) {
        console.error("Error while registering admin:", error);
        return res.status(500).json({ error: "Error while registering admin" });
      }
    });
  } else if (role == "isUser" || role == "isUsers") {
    if (!email || !pswd) {
      return res.status(400).json({ error: "Please enter email and password" });
    }
    const sql = "SELECT email FROM students WHERE email = ?";

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
        const userData = [
          email,
          hashedPassword,
          symbol,
          dob,
          name,
          phone,
          address,
          faculty,
          semester,
          role,
        ];
        const sql_insert =
          "INSERT INTO students (email, password, symbol, dob, name, phone, address, faculty, semester, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await db.query(sql_insert, userData);
        return res.status(200).json({ success: "User has been registered" });
      } catch (error) {
        console.error("Error while registering User:", error);
        return res.status(500).json({ error: "Error while registering User" });
      }
    });
  } else {
    res.json({ status: 404, message: "not found" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("adminRegistered");
  res.redirect("/");
};
