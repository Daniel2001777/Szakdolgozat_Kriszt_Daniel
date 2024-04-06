import { format, set } from "date-fns";
import { React, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../../axios/axiosInstance";
import CalculateForm from "./RentForms/CalculateForm/CalculateForm";
import RentEmail from "./RentForms/DataForms/RentEmail";
import RentEndDate from "./RentForms/DataForms/RentEndDate";
import style from "./RentForms/RentForm.module.css";
import RentName from "./RentForms/DataForms/RentName";
import RentStartDate from "./RentForms/DataForms/RentStartDate";
import RentTel from "./RentForms/DataForms/RentTel";
import RentAddressForm from "./RentForms/AddressForms/RentAddressForm";
import ValidateError from "./RentForms/ValidateError";

export default function CarForm({ carName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telNumber, setTelNumber] = useState("");
  const [startFormDate, setStartFormDate] = useState("");
  const [endFormDate, setEndFormDate] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [nameValidate, setNameValidate] = useState(true);
  const [emailValidate, setEmailValidate] = useState(true);
  const [telValidate, setTelValidate] = useState(true);
  const [startValidate, setStartValidate] = useState("");
  const [endValidate, setEndValidate] = useState("");
  const [postcodeValidate, setPostcodeValidate] = useState(true);
  const [cityValidate, setCityValidate] = useState(true);
  const [streetValidate, setStreetValidate] = useState(true);
  const [addressValidate, setAddressValidate] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState("");

  const words = street.split(" ");
  const streetNumber = words.pop();
  const streetName = words.join(" ");

  function getCurrentDate() {
    const currentDate = new Date();
    return format(currentDate, "yyyy-MM-dd'T'HH:mm");
  }

  function checkDateRange(date) {
    const activeDateHours = new Date(date).getHours();
    const activeDateMinutes = new Date(date).getMinutes();

    return (
      (activeDateHours >= 6 && activeDateHours <= 21) ||
      (activeDateHours === 22 && activeDateMinutes <= 0)
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nameValidate &&
      emailValidate &&
      telValidate &&
      postcodeValidate &&
      cityValidate &&
      streetValidate &&
      validateTelNumber() &&
      validateEmail() &&
      validateArrdess()
    ) {
      try {
        const formData = {
          carName,
          name,
          email,
          telNumber,
          postcode,
          city,
          streetName,
          streetNumber,
          startDate: startFormDate,
          endDate: endFormDate,
        };
        const response = await axios.post("/saveFormData", formData);
        if (response.status === 200) {
          console.log("Az adatok sikeresen elmentve!");
          setName("");
          setEmail("");
          setTelNumber("");
          setPostcode("");
          setCity("");
          setStreet("");
          setStartFormDate("");
          setEndFormDate("");
          setIsFormSubmitted(
            <div
              style={{
                fontFamily: '"Black Ops One", system-ui',
                color: "green",
              }}
            >
              Az adatok elmentve!
            </div>
          );
        } else {
          console.error("Nem sikerült elmenteni az adatokat!", response.data);
          setIsFormSubmitted(
            <ValidateError>Az adatok nem lettek elmentve!</ValidateError>
          );
        }
      } catch (error) {
        console.error("A hiba: ", error);
      }
    }
  };

  const validateTelNumber = async () => {
    try {
      const response = await axios.post("/validateTelNumber", {
        telNumber,
      });
      setTelValidate(response.data.isValidTel);
    } catch (error) {
      console.error("Nem sikerült ellenőrizni a telefonszámot.", error);
    }
  };

  const validateEmail = async () => {
    try {
      const response = await axios.post("/validateEmail", { email });
      console.log(response.data.isValidEmail);
      setEmailValidate(response.data.isValidEmail);
    } catch (error) {
      console.error("Nem sikerült ellenőrizni az email-t.", error);
    }
  };

  const validateArrdess = async () => {
    const address = `${city} ${postcode} ${streetName.trim()} ${streetNumber}`;
    try {
      const response = await axios.post("/validateAddress", { address });
      console.log(response.data.isValidAddress);
      setAddressValidate(response.data.isValidAddress);
    } catch (error) {
      console.error("Nem sikerült ellenőrizni a címet.", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <RentName
          name={name}
          setName={setName}
          nameValidate={nameValidate}
          setNameValidate={setNameValidate}
        />
        <RentEmail
          email={email}
          setEmail={setEmail}
          emailValidate={emailValidate}
          setEmailValidate={setEmailValidate}
        />
        <RentTel
          telNumber={telNumber}
          setTelNumber={setTelNumber}
          telValidate={telValidate}
          setTelValidate={setTelValidate}
        />
        <RentStartDate
          startFormDate={startFormDate}
          setStartFormDate={setStartFormDate}
          getCurrentDate={getCurrentDate}
          checkDateRange={checkDateRange}
          startValidate={startValidate}
          setStartValidate={setStartValidate}
        />
        <RentEndDate
          startFormDate={startFormDate}
          checkDateRange={checkDateRange}
          endFormDate={endFormDate}
          setEndFormDate={setEndFormDate}
          endValidate={endValidate}
          setEndValidate={setEndValidate}
        />
        <RentAddressForm
          postcodeValidate={postcodeValidate}
          setPostcodeValidate={setPostcodeValidate}
          cityValidate={cityValidate}
          setCityValidate={setCityValidate}
          streetValidate={streetValidate}
          setStreetValidate={setStreetValidate}
          postcode={postcode}
          setPostcode={setPostcode}
          city={city}
          setCity={setCity}
          street={street}
          setStreet={setStreet}
          addressValidate={addressValidate}
          setAddressValidate={setAddressValidate}
        />
        <div
          className={style.container}
          style={{
            fontSize: "1.5rem",
            marginTop: "0",
          }}
        >
          {isFormSubmitted}
        </div>
        <div className={style.container}>
          <Button variant="light" type="submit">
            Mehet
          </Button>
        </div>
      </Form>
      <h5 className={`text-light ${style.h5}`}>Mennyibe kerül?</h5>
      <CalculateForm getCurrentDate={getCurrentDate} style={style} />
    </>
  );
}
