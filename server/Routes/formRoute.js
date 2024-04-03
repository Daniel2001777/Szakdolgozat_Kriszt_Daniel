const express = require("express");
const router = express.Router();
const { validateTelNumber, validateEmail, validateAddress } = require("../Validation/formValidation");

router.post("/validateTelNumber", (req, res) => {
  const { telNumber } = req.body;
  const isValidTel = validateTelNumber(telNumber);
  res.json({ isValidTel });
});

router.post("/validateEmail", (req, res) => {
  const { email } = req.body;
  const isValidEmail = validateEmail(email);
  res.json({ isValidEmail });
});

router.post("/validateAddress", async (req, res) => {
  const { address } = req.body;
  const isValidAddress = await validateAddress(address);
  res.json({ isValidAddress });
});

module.exports = router;
