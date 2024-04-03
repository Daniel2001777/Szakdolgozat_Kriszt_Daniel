import React from "react";
import style from "../RentForm.module.css";
import { MdEmail } from "react-icons/md";
import { FloatingLabel, Form } from "react-bootstrap";
import validator from "validator";
import ValidateError from "../ValidateError";

export default function RentEmail({email, setEmail, emailValidate, setEmailValidate}) {

  function handleEmail() {
    const isValidEmail = validator.isEmail(email);
    setEmailValidate(isValidEmail);
  }

  return (
    <Form.Group controlId="email">
      <Form.Label className={`h5 text-light ${style.formLabel}`}>
        <MdEmail className="me-2" />
        Email
      </Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Email cím"
        className={`mb-3 ${style.label}`}
      >
        <Form.Control
          type="email"
          placeholder="Írd be az email címet!"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={handleEmail}
          required
        />
        {emailValidate ? "" : <ValidateError>Nem érvényes email cím.</ValidateError>}
      </FloatingLabel>
    </Form.Group>
  );
}
