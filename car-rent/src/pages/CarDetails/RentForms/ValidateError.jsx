import React from "react";

export default function ValidateError(props) {
  return (
    <div
      className="ms-2"
      style={{
        fontFamily: '"Black Ops One", system-ui',
        color: "red",
      }}
    >
      {props.children}
    </div>
  );
}
