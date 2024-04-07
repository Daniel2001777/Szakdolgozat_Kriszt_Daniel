const express = require("express");
const router = express.Router();
const db = require("../Database/db.js");

router.post("/update", (req, res) => {
    const carData = req.body;
    const sql = 'UPDATE car_data SET title = ?, car_description = ?, description = ?, price = ?, deposit = ?, main_img = ? WHERE id = ?';
    const values = [
        carData.title,
        carData.carDescription,
        carData.description,
        carData.price,
        carData.deposit,
        carData.mainImage,
        carData.id,
    ];
     db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Hiba történt az cím frissítése során:", err);
            return res.status(500).send("A cím frissítése sikertelen.");
          }
          console.log("A beillesztett rekord: ", data.affectedRows);
          return res.status(200).send("Az címet sikeresen frissítettük!");
     })
})

module.exports = router;