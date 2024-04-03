const { validateTelNumber, validateEmail, validateAddress } = require("../Validation/formValidation");

const validateForm = (res, req) => {
  const { telNumber, email, address } = req.body;
  const telValid = validateTelNumber(telNumber);
  const emailValid = validateEmail(email);
  const addressValid = validateAddress(address);

  res.json({ telValid, emailValid, addressValid });
};

module.exports = { validateForm };
