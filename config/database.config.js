const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  debug: true,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("🚀 ~ DATABASE ~ connection: ERROR", err);
  } else {
    console.log("🚀 ~ DATABASE ~ Connected");
  }
});

module.exports = pool;
