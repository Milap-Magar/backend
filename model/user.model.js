const db = require("../config/database.config");

exports.getAllUsers = async () => {
  try {
    const [result] = await db.query("SELECT * FROM admin");
    return [result];
  } catch (error) {
    console.log("Error at user model", error);
    throw error;
  }
};
