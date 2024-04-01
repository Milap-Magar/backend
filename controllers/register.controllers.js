const db = require("../config/database.config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password: pswd } = req.body;
  const sql = "SELECT email FROM admins WHERE email = ?";
  const sql_insert = "INSERT into admins SET ?";

  if (!email || !pswd)
    return req.json({ status: 204, error: "Please enter the password" });
  else {
    console.log("your email is : ", email);
    db.query(sql, [email], async (err, result) => {
      if (err) throw err;
      if (result[0]) {
        return res.json({
          status: 409,
          error: "Email has already been registered!",
        });
      } else {
        const hashedPassword = await bcrypt.hash(pswd, 8);
        console.log("your hashedPassword is : ", hashedPassword);
        db.query(
          sql_insert,
          {
            email: email,
            password: hashedPassword,
          },
          (error, results) => {
            if (error) throw error;
            return res.json({
              status: 200,
              success: "User has been registered",
            });
          }
        );
      }
    });
  }
};
module.exports = register;
