const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "car_rent",
});

router.get("/leases", (req, res) => {
  const sql = "SELECT * FROM leases";
  db.connect((err) => {
    if (err) throw err;
    console.log("Kapcsolódva.");
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
});

router.post("/saveFormData", (req, res) => {
  const formData = req.body;
  console.log("Az adat: ", formData);
  db.connect((err) => {
    if (err) throw err;
    console.log("Kapcsolódva.");
    const sql =
      "INSERT INTO leases (auto_name, name, email, tel, postal_code, city, street_name, house_number, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      formData.carName,
      formData.name,
      formData.email,
      formData.telNumber,
      formData.postcode,
      formData.city,
      formData.streetName,
      formData.streetNumber,
      formData.startDate,
      formData.endDate,
    ];
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Hiba történt az adatok mentése során:", err);
        return res.status(500).send("Az adatok mentése sikertelen.");
      }
      console.log("A beillesztett rekord: ", data.affectedRows);
      return res.status(200).send("Az adatokat sikeresen elmentettük!");
    });
  });
});

module.exports = router;
