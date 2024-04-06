const express = require("express");
const router = express.Router();
const db = require("../Database/db.js");

router.post("/getCarData", (req, res) => {
  const sql = "SELECT * FROM car_data";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Hiba a lekérdezés során:", err);
      return res.status(500).json({ err: "Internal server error" });
    }
    console.log("Lekérdezés eredménye:", data);
    res.json(data);
  });
});

router.post("/saveCarData", (req, res) => {
  const carData = req.body;
  console.log("Az adat: ", carData.title);
  const sql =
    "INSERT INTO car_data (title, car_description, description, price, deposit, slug) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    carData.title,
    carData.cardDescription,
    carData.description,
    carData.price,
    carData.deposit,
    carData.convertedTitle,
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

module.exports = router;
