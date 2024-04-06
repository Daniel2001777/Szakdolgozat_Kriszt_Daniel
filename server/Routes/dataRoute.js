const express = require("express");
const router = express.Router();
const db = require("../Database/db.js")

router.post("/getData", (req, res) => {
  const sql = "SELECT * FROM leases";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Hiba a lekérdezés során:", err);
      return res.status(500).json({ err: "Internal server error" });
    }
    console.log("Lekérdezés eredménye:", data);
    res.json(data);
  });
});

router.post("/saveFormData", (req, res) => {
  const formData = req.body;
  console.log("Az adat: ", formData.name);
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

router.delete("/deleteRow", (req, res) => {
  const rentId = req.body.id;
  console.log(rentId);
  const sql = "DELETE FROM leases WHERE id IN (?)";
  db.query(sql, [rentId], (err, data) => {
    if (err) {
      console.error("Hiba történt az adatok törlése során:", err);
      return res.status(500).send("Az adatok törlése sikertelen.");
    }
    return res.status(200).send("Az adatokat sikeresen töröltük!");
  });
});

module.exports = router;
