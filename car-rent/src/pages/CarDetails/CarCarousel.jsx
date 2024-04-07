import React from "react";
import { Carousel } from "react-bootstrap";
import { storage } from "../../firebase/firebase.js";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";

export default function CarCarousel({ slug, mainImage }) {
  const [carImages, setCarImages] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(mainImage);

  useEffect(() => {
    listPictures();
    setLoading(false);
  }, []);

  const listPictures = async () => {
    const listRef = ref(storage, `${slug}`);
    await listAll(listRef).then((response) => {
      response.items.forEach((item) => {
        const name = item.name;
        getDownloadURL(item).then((url) => {
          setCarImages((prev) => ({ ...prev, [name]: url }));
        });
      });
    });
  };

  const updatedImages = Object.fromEntries(
    Object.entries(carImages).filter(([name, url]) => url !== mainImage)
  );

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Carousel data-bs-theme="dark">
        <Carousel.Item key={mainImage}>
          <img className={`d-block w-100`} src={mainImage} alt={mainImage} />
        </Carousel.Item>
        {Object.entries(updatedImages).map(([name, url]) => {
          return (
            <Carousel.Item key={url}>
              <img className={`d-block w-100`} src={url} alt={name} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}
