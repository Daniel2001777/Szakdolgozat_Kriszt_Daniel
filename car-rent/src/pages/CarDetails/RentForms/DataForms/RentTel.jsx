import React from "react";
import style from "../RentForm.module.css";
import { FaMobile } from "react-icons/fa";
import { FloatingLabel, Form } from "react-bootstrap";
import validator from "validator";
import ValidateError from "../ValidateError";

export default function RentTel({
  telNumber,
  setTelNumber,
  telValidate,
  setTelValidate,
}) {
  function handleTel() {
    const isValidTel = validator.isMobilePhone(telNumber.toString(), "hu-HU");
    setTelValidate(isValidTel);
  }

  return (
    <Form.Group controlId="tel">
      <Form.Label className={`h5 text-light ${style.formLabel}`}>
        <FaMobile className="me-2" />
        Telefonszám
      </Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Telefonszám"
        className={`mb-3 ${style.label}`}
      >
        <Form.Control
          type="tel"
          placeholder="Írd be a telefonszámot!"
          value={telNumber}
          onChange={(event) => setTelNumber(event.target.value)}
          onBlur={handleTel}
          required
        />
        {telValidate ? (
          ""
        ) : (
          <ValidateError>
            Nem érvényes telefonszám. A helyes formátum: +36704134681
          </ValidateError>
        )}
      </FloatingLabel>
    </Form.Group>
  );
}
