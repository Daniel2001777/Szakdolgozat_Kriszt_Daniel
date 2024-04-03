import React, { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

export default function CalculateForm({ style, getCurrentDate }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [calculation, setCalculation] = useState("");

  const handleCalculation = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceTime = end.getTime() - start.getTime();
    const differenceDay = end.getDate() - start.getDate();
    setCalculation(
      differenceDay === 0
        ? (differenceDay + 1) * 20000
        : (differenceDay + 1) * 20000
    );
  };

  return (
    <>
      <Form>
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
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            min={getCurrentDate()}
          />
        </FloatingLabel>
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
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            min={startDate}
            disabled={!startDate}
          />
        </FloatingLabel>
        <div
          className={style.container}
          style={({color: "white"})}
        >
          {calculation + " Ft"}
        </div>
        <div className={style.container}>
          <Button
            variant="light"
            className="mb-3"
            disabled={!endDate}
            onClick={handleCalculation}
          >
            Számol
          </Button>
        </div>
      </Form>
    </>
  );
}
