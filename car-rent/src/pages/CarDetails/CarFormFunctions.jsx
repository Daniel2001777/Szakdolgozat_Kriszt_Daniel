import { format } from "date-fns";

export function checkDateRange(date) {
  const activeDateHours = new Date(date).getHours();
  const activeDateMinutes = new Date(date).getMinutes();

  return (
    (activeDateHours >= 6 && activeDateHours <= 21) ||
    (activeDateHours === 22 && activeDateMinutes <= 0)
  );
}

export function handleStart(event, setStartDate, setStartValidate) {
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

export function handleEnd(event, setEndDate, setEndValidate) {
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

export function getCurrentDate() {
  const currentDate = new Date();
  console.log(format(currentDate, "yyyy-MM-dd'T'HH:mm"));
  return format(currentDate, "yyyy-MM-dd'T'HH:mm");
}
