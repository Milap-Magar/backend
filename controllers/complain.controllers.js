const db = require("../config/database.config");

exports.complain = async (req, res) => {
  const { title, email, message, faculty, semester } = req.body;
  console.log(req.body);

  if (!title || !email || !message || !faculty || !semester) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  const sql_insert =
    "INSERT INTO complains (title, email, message, faculty, semester) VALUES (?, ?, ?, ?, ? )";

  db.query(
    sql_insert,
    [title, email, message, faculty, semester],
    async (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      try {
        // console.log("Result:", result);
        return res
          .status(200)
          .json({ success: "Complaint has been submitted successfully" });
      } catch (error) {
        console.error("Error while submitting complaint:", error);
        return res
          .status(500)
          .json({ error: "Error while submitting complaint" });
      }
    }
  );
};
