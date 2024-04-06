import React from "react";
import ValidateError from "../ValidateError";
import { FaHome } from "react-icons/fa";
import { FloatingLabel, Form } from "react-bootstrap";

export default function PostcodeAddress({
  style,
  postcode,
  setPostcode,
  postcodeValidate,
  setPostcodeValidate,
}) {
  function handlePostcodeValidation() {
    const postcodeRegex = /^[1-9]\d{3}$/;
    setPostcodeValidate(postcodeRegex.test(postcode));
  }

  return (
    <Form.Group controlId="postcode">
      <Form.Label className={`h5 text-light ${style.formLabel}`}>
        <FaHome className="me-2" />
        Irányítószám
      </Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Irányítószám"
        className={`mb-3 ${style.label}`}
      >
        <Form.Control
          type="text"
          placeholder="Írd be az irányítószámot!"
          value={postcode}
          onChange={(event) => setPostcode(event.target.value.trim())}
          onBlur={handlePostcodeValidation}
          required
        />
        {postcodeValidate ? (
          ""
        ) : (
          <ValidateError>Nem érvényes irányítószám.</ValidateError>
        )}
      </FloatingLabel>
    </Form.Group>
  );
}
