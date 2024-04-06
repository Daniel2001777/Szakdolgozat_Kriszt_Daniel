import React from "react";
import { FaHome } from "react-icons/fa";
import { FloatingLabel, Form } from "react-bootstrap";
import ValidateError from "../ValidateError";

export default function CityAddress({ style, city, setCity, cityValidate, setCityValidate}) {

  function handleCityValidation() {
    const cityRegex = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+(?:-[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)?$/;
    setCityValidate(cityRegex.test(city));
  }

  return (
    <Form.Group controlId="city">
      <Form.Label className={`h5 text-light ${style.formLabel}`}>
        <FaHome className="me-2" />
        Város
      </Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Város"
        className={`mb-3 ${style.label}`}
      >
        <Form.Control
          type="text"
          placeholder="Írd be a város nevét!"
          value={city}
          onChange={(event) => setCity(event.target.value.trim())}
          onBlur={handleCityValidation}
          required
        />
        {cityValidate ? "" : <ValidateError>A helyes formátum: "Debrecen", "Debrecen-Józsa".</ValidateError>}
      </FloatingLabel>
    </Form.Group>
  );
}
