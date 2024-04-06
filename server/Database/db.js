const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "car_rent",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Kapcsolódva.");
});

module.exports = db;
