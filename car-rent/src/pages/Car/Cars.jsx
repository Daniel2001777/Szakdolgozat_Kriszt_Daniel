import React from "react";
import CarCard from "./CarCard";
import styles from "./Cars.module.css";
import { useEffect } from "react";
import axios from "../../axios/axiosInstance.js";
import { useState } from "react";
import { getCarData } from "../../assets/Data/data2.js";

export default function Cars() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCarData();
      setData(data);
    };
    getData();
  }, []);


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
            title={cars.title}
            description={cars.car_description}
            slug={cars.slug}
          />
        ))}
      </div>
    </>
  );
}
