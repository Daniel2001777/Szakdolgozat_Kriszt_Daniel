import React, { useState } from "react";
import style from "../RentForm.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FloatingLabel, Form } from "react-bootstrap";

export default function RentEndDate({
  startFormDate,
  checkDateRange,
  endFormDate,
  setEndFormDate,
  endValidate,
  setEndValidate
}) {

  function handleEnd(event) {
    const date = event.target.value;

    if (date < startFormDate) {
      setEndFormDate("");
      setEndValidate(
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
      setEndFormDate(date);
      setEndValidate("");
    } else {
      setEndFormDate("");
      setEndValidate(
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
    <Form.Group controlId="end">
      <Form.Label className={`h5 text-light ${style.formLabel}`}>
        <FaCalendarAlt className="me-2" />
        Végző dátum
      </Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Végző dátum"
        className={`mb-3 ${style.label}`}
      >
        <Form.Control
          type="datetime-local"
          placeholder="End date"
          value={endFormDate}
          onChange={(event) => handleEnd(event)}
          min={startFormDate}
          disabled={!startFormDate}
        />
        {endValidate}
      </FloatingLabel>
    </Form.Group>
  );
}
