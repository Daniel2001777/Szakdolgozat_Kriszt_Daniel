import React from "react";
import style from "../RentForm.module.css";
import CityAddress from "./CityAddress";
import PostcodeAddress from "./PostcodeAddress";
import StreetAddress from "./StreetAddress";
import ValidateError from "../ValidateError";

export default function RentAddressForm({
  streetValidate,
  setStreetValidate,
  cityValidate,
  setCityValidate,
  postcodeValidate,
  setPostcodeValidate,
  postcode,
  setPostcode,
  city,
  setCity,
  street,
  setStreet,
  addressValidate,
}) {
  return (
    <>
      <PostcodeAddress
        postcode={postcode}
        setPostcode={setPostcode}
        postcodeValidate={postcodeValidate}
        setPostcodeValidate={setPostcodeValidate}
        style={style}
      />
      <CityAddress
        city={city}
        setCity={setCity}
        cityValidate={cityValidate}
        setCityValidate={setCityValidate}
        style={style}
      />
      <StreetAddress
        street={street}
        setStreet={setStreet}
        streetValidate={streetValidate}
        setStreetValidate={setStreetValidate}
        style={style}
      />
      {addressValidate ? "" : <ValidateError>Nem jó a cím!</ValidateError>}
    </>
  );
}
