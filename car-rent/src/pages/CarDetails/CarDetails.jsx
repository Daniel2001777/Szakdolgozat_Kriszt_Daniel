import { React } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CarCarousel from "./CarCarousel.jsx";
import CarForm from "./CarForm.jsx";
import style from "./CarDetails.module.css";
import { getCarData } from "../../assets/Data/data2.js";
import { useState } from "react";
import { useEffect } from "react";

export default function CarDetails() {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getCarData();
      setData(data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const carData = data.find((car) => car.slug === name);

  return (
    <>
      <div className={style.flexBox}>
        <div className={style.imageContainer}>
          <CarCarousel slug={carData.slug} />
          <div
            className={style.description}
            dangerouslySetInnerHTML={{ __html: carData.description }}
          ></div>
        </div>
        <div className={style.inputContainer}>
          <CarForm carName={carData.slug} />
        </div>
      </div>
    </>
  );
}
