import React from "react";
import { Carousel } from "react-bootstrap";

export default function CarCarousel({ carData }) {
  return (
    <Carousel data-bs-theme="dark" fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carData.img}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carData.img2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carData.img}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
