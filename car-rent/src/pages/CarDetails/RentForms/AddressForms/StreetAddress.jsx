import React from "react";
import { FaHome } from "react-icons/fa";
import { FloatingLabel, Form } from "react-bootstrap";
import ValidateError from "../ValidateError";

export default function StreetAddress({
  style,
  street,
  setStreet,
  streetValidate,
  setStreetValidate,
}) {
  function handleStreetValidation() {
    const streetRegex =
      /^[a-zA-Z0-9ÁÉÍÓÖŐÚÜŰáéíóöőúüű. -]+(?: [a-zA-Z0-9ÁÉÍÓÖŐÚÜŰáéíóöőúüű. -]+)*(?:\d{1,3}(?:\/[A-Za-z])?|\d{1,3}-\d{1,3})$/;
    setStreetValidate(streetRegex.test(street));
  }

  return (
    <Form.Group controlId="street">
      <Form.Label className={`h5 text-light ${style.formLabel}`}>
        <FaHome className="me-2" />
        Utca, Házszám
      </Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Utca, házszám"
        className={`mb-3 ${style.label}`}
      >
        <Form.Control
          type="text"
          placeholder="Írd be az utca nevét, és a házszámot!"
          value={street}
          onChange={(event) => setStreet(event.target.value.trim())}
          onBlur={handleStreetValidation}
          required
        />
        {streetValidate ? (
          ""
        ) : (
          <ValidateError>
            Nem jó az utcanév! A helyes formátum: "Katona József utca 7".
          </ValidateError>
        )}
      </FloatingLabel>
    </Form.Group>
  );
}
