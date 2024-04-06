const mysql = require("mysql");
const db = require("./db.js");

const getData = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM leases";
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
