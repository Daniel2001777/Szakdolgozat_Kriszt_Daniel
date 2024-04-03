const validator = require("validator");
const axios = require("axios");

const validateTelNumber = (telNumber) => {
  return validator.isMobilePhone(telNumber, "hu-HU");
};

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validateAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );

    return response.data.length > 0;
  } catch (error) {
    console.error("Hiba a Nominatim lekérdezés során:", error);
    return false;
  }
};

module.exports = { validateTelNumber, validateEmail, validateAddress };
