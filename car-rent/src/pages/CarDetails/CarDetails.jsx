import { React } from "react";
import data from "../../assets/Data/data.js";
import { useParams } from "react-router-dom";
import CarCarousel from "./CarCarousel.jsx";
import CarForm from "./CarForm.jsx";
import style from "./CarDetails.module.css";

export default function CarDetails() {
  const { name } = useParams();

  const carData = data.find((car) => car.slug === name);

  return (
    <>
      <div className={style.flexBox}>
        <div className={style.imageContainer}>
          <CarCarousel carData={carData} />
          <p className={style.description}></p>
        </div>
        <div className={style.inputContainer}>
          <CarForm carName={carData.slug} />
        </div>
      </div>
    </>
  );
}
