import { React, useCallback, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { FloatingLabel, Form } from "react-bootstrap";
import { format } from "date-fns";
import style from "./CarDetails.module.css";

export default function CarForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startValidate, setStartValidate] = useState("");
  const [endValidate, setEndValidate] = useState("");

  function checkDateRange(date) {
    const activeDateHours = new Date(date).getHours();
    const activeDateMinutes = new Date(date).getMinutes();

    return (
      (activeDateHours >= 6 && activeDateHours <= 21) ||
      (activeDateHours === 22 && activeDateMinutes <= 0)
    );
  }

  function handleStart(event) {
    const date = event.target.value;
    const inputDate = new Date(date);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      setStartDate("");
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
      setStartDate(date);
      setStartValidate("");
    } else {
      setStartDate("");
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

  function handleEnd(event) {
    const date = event.target.value;

    if (date < startDate) {
      setEndDate("");
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
      setEndDate(date);
      setEndValidate("");
    } else {
      setEndDate("");
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

  function getCurrentDate() {
    const currentDate = new Date();
    console.log(format(currentDate, "yyyy-MM-dd'T'HH:mm"));
    return format(currentDate, "yyyy-MM-dd'T'HH:mm");
  }

  return (
    <>
      <h5 className={`text-light ${style.h5}`}>
        <IoIosContact className="me-2" />
        Név
      </h5>
      <FloatingLabel
        controlId="floatingInput"
        label="Név"
        className={`mb-3 ${style.label}`}
      >
        <Form.Control type="text" placeholder="Valaki Valaki" />
      </FloatingLabel>
      <Form.Label className={`h5 text-light ${style.h5}`}>
        <MdEmail className="me-2" />
        Email
      </Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Email cím"
        className={`mb-3 ${style.label}`}
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <Form.Label className={`text-light ${style.h5}`}>
        <MdEmail className="me-2" />
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
          value={startDate}
          onChange={handleStart}
          min={getCurrentDate()}
        />
        {startValidate}
      </FloatingLabel>
      <Form.Label className={`text-light ${style.h5}`}>
        <MdEmail className="me-2" />
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
          value={endDate}
          onChange={handleEnd}
          min={startDate}
          disabled={!startDate}
        />
        {endValidate}
      </FloatingLabel>
    </>
  );
}
