const db = require("../config/database.config");

exports.getAllAdmins = async () => {
  try {
    const [result] = await db.query(
      "SELECT  admin_id, name, email, phone, address FROM admins INNER JOIN admin ON user.user_id = admin.user_id"
    );
    return [result];
  } catch (error) {
    console.log("Error at admin model", error);
    throw error;
  }
};
