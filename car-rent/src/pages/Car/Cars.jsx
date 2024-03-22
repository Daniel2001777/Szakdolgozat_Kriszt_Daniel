import React from "react";
import CarCard from "./CarCard";
import styles from "./Cars.module.css";
import data from "../../assets/Data/data.js";

export default function Cars() {
  return (
    <>
      <div
        className={`container d-flex justify-content-center rounded-4 mb-4 ${styles.container}`}
      >
        <h1
          className="display-3 mb-0 me-3 ms-3 mt-1"
          style={{
            fontFamily: '"Black Ops One", system-ui',
            fontWeight: "400 !important",
            fontStyle: "normal !important",
          }}
        >
          Bérelhető autóink
        </h1>
      </div>
      <div className={`${styles.row}`}>
        {data.map((cars) => (
          <CarCard
            key={cars.title}
            img={cars.img}
            title={cars.title}
            description={cars.description}
            slug={cars.slug}
          />
        ))}
      </div>
    </>
  );
}
