const db = require("../config/database.config");

exports.getAllAdmins = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM admins");
    return rows;
  } catch (error) {
    console.log("Error at admin model", error);
    throw error;
  }
};
