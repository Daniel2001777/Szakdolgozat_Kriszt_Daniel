import React, { useState } from "react";
import style from "../RentForm.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FloatingLabel, Form } from "react-bootstrap";

export default function RentStartDate({
  startFormDate,
  setStartFormDate,
  getCurrentDate,
  checkDateRange,
  startValidate,
  setStartValidate
}) {

  function handleStart(event) {
    const date = event.target.value;
    const inputDate = new Date(date);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      setStartFormDate("");
      setStartValidate(
        <div
          className="ms-2"
          style={{
            fontFamily: '"Black Ops One", system-ui',
            color: "red",
          }}
        >
          Nem érvényes dátum.
        </div>
      );
      return;
    }

    if (checkDateRange(date)) {
      setStartFormDate(date);
      setStartValidate("");
    } else {
      setStartFormDate("");
      setStartValidate(
        <div
          className="ms-2"
          style={{
            fontFamily: '"Black Ops One", system-ui',
            color: "red",
          }}
        >
          A választott dátum nem 6 és 22 óra között van.
        </div>
      );
    }
  }

  return (
    <Form.Group controlId="start">
      <Form.Label className={`h5 text-light ${style.formLabel}`}>
        <FaCalendarAlt className="me-2" />
        Kezdő dátum
      </Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Kezdő dátum"
        className={`mb-3 ${style.label}`}
      >
        <Form.Control
          type="datetime-local"
          placeholder="Start date"
          value={startFormDate}
          onChange={(event) => handleStart(event)}
          min={getCurrentDate()}
          required
        />
        {startValidate}
      </FloatingLabel>
    </Form.Group>
  );
}
