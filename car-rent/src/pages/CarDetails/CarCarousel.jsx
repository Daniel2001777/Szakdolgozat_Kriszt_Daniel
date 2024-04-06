import React from "react";
import { Carousel } from "react-bootstrap";
import { storage } from "../../firebase/firebase.js";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";

export default function CarCarousel({ slug }) {
  const [carImages, setCarImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Carousel data-bs-theme="dark" fade>
        {Object.entries(carImages).map(([name, url]) => {
          return (
            <Carousel.Item key={name}>
              <img className="d-block w-100" src={url} alt={name} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}
