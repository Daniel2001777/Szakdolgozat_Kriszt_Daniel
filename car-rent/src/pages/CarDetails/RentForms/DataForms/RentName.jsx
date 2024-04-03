import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { IoIosContact } from "react-icons/io";
import style from "../RentForm.module.css";
import ValidateError from "../ValidateError";

export default function RentName({nameValidate, setNameValidate, name, setName}) {
  const handleNameValidation = () =>{
    const isValidFormat = /^(Dr\.? |dr\.? )?([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]*)( ([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]*))*$/.test(name.trim());
    setNameValidate(isValidFormat);
  } 

  return (
    <Form.Group controlId="name">
      <Form.Label className={`h5 text-light ${style.formLabel}`}>
        <IoIosContact className="me-2" />
        Név
      </Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Név"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onBlur={handleNameValidation}
        className={`mb-3 ${style.label}`}
      >
        <Form.Control type="text" placeholder="Írd be a neved!" required />
        {nameValidate ? "" : <ValidateError>Nem jó a név!</ValidateError>}
      </FloatingLabel>
    </Form.Group>
  );
}
