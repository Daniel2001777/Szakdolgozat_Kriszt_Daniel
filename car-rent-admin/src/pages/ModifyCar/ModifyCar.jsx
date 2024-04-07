import React, { useEffect, useState } from "react";
import style from "./modifyCar.module.css";
import { Form, FormSelect, Button } from "react-bootstrap";
import axios from "../../axios/axiosInstance.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../ckEditor.css";
import { storage } from "../../firebase/firebase.js";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

export default function ModifyCar() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [selectedCar, setSelectedCar] = useState([]);
  const [title, setTitle] = useState("");
  const [carDescription, setCarDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [carImages, setCarImages] = useState({});
  const [carSlug, setCarSlug] = useState("");
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await getCarData();
      setData(data);
    };
    getData();
  }, []);

  useEffect(() => {
    setCarImages([]);
    if (selected) {
      const car = data.find((car) => car.title === selected);
      setSelectedCar(car);
      setTitle(car.title);
      setCarDescription(car.car_description);
      setDescription(car.description);
      setDeposit(car.deposit);
      setPrice(car.deposit);
      setCarSlug(car.slug);
      setMainImage(car.main_img);
      setId(car.id);
      const listCarRef = ref(storage, `${car.slug}`);
      listPictures(listCarRef, car.main_img);
    }
  }, [selected]);

  useEffect(() => {
    if (!images.length) return;

    console.log(images);
    const uploadImages = async () => {
      for (let i = 0; i < images.length; i++) {
        const imageRef = ref(storage, `${carSlug}/${carSlug + v4()}`);
        await uploadBytes(imageRef, images[i]);
      }
      const listCarRef = ref(storage, `${carSlug}`);
      listPictures(listCarRef);
    };
    uploadImages();
  }, [images]);

  const getCarData = async () => {
    try {
      const response = await axios.post("/getCarData");
      return response.data;
    } catch (err) {
      console.log("Hiba az adatok lekérdezésénél.", err);
      return [];
    }
  };

  const handleImageDelete = async (name) => {
    const desertRef = ref(storage, `${carSlug}/${name}`);
    await deleteObject(desertRef)
      .then(() => {
        alert("A kép sikeresen törölve!");
        const updatedImages = Object.fromEntries(
          Object.entries(carImages).filter(([key]) => key !== name)
        );
        setCarImages(updatedImages);
        const listCarRef = ref(storage, `${carSlug}`);
        listPictures(listCarRef, mainImage);
      })
      .catch((err) => {
        alert("A képet nem siketült törölni!", err);
      });
  };

  const listPictures = async (ref, mainImage) => {
    await listAll(ref).then(async(response) => {
      let isMainChecked = false;
      console.log(mainImage);
      const promises = [];

      response.items.forEach( async (item) => {
        const name = item.name;
        const promise = getDownloadURL(item).then((url) => {
          setCarImages((prev) => ({ ...prev, [name]: url }));
          if (url === mainImage) {
            isMainChecked = true;
          }
        });
        promises.push(promise);
      });

      await Promise.all(promises);

      if (!isMainChecked && response.items.length > 0) {
        getDownloadURL(response.items[0]).then((url) => {
          setMainImage(url);
        });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      id,
      title,
      carDescription,
      description,
      price,
      deposit,
      mainImage,
    };
    try {
      const response = await axios.post("/update", carData);
      if (response.status === 200) {
        console.log("Az adatbázis sikeresen frissítve!");
        setTitle("");
        setCarDescription("");
        setDescription("");
        setPrice("");
        setDeposit("");
        setImages([]);
        setCarImages({});
        setCarSlug("");
        setId("");
        alert("Az adatbázis sikeresen frissítve!");
        window.location.reload();
      } else {
        console.error("Nem sikerült frissíteni az adatbázist!", response.data);
      }
    } catch (err) {
      console.error("A hiba: ", err);
    }
  };

  return (
    <>
      <div className={style.container}>
        <FormSelect
          size="lg"
          defaultValue={""}
          onChange={(event) => setSelected(event.target.value)}
        >
          <option value={""} disabled>
            Válassz egy módosítandó autót!
          </option>
          {data.map((cars) => {
            return (
              <option value={cars.title} key={cars.id}>
                {cars.title}
              </option>
            );
          })}
        </FormSelect>
        {!selected ? (
          <div></div>
        ) : (
          <Form className={style.contentContainer} onSubmit={handleSubmit}>
            <div className={style.left}>
              <Form.Group>
                <Form.Label className="control-label">Cím</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className="control-label">Kártya leírás</Form.Label>
                <Form.Control
                  as="textarea"
                  className={style.textAreaCard}
                  value={carDescription}
                  onChange={(event) => setCarDescription(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Ár/Hó(Ft)</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
            </div>
            <div className={style.right}>
              <Form.Group>
                <Form.Label className="control-label">
                  Fényképek feltöltése
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) => {
                    setImages(Array.from(event.target.files));
                    alert("A képek töltődnek!");
                  }}
                  multiple
                ></Form.Control>
              </Form.Group>
              <Form.Label className="control-label">Leírás</Form.Label>
              <div className={style.textAreaDescription}>
                <CKEditor
                  className={style.textAreaDescription}
                  editor={ClassicEditor}
                  data={description}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor készen áll az indulásra!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                />
              </div>
              <Form.Group>
                <Form.Label>Kaukció(Ft)</Form.Label>
                <Form.Control
                  type="number"
                  value={deposit}
                  onChange={(event) => setDeposit(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
            </div>
            <div className={style.imagesContainer}>
              {Object.entries(carImages).map(([name, url]) => {
                return (
                  <div key={name} className={style.imgContainer}>
                    <div className={style.check}>
                      Címlap:
                      <input
                        type="checkbox"
                        className="ms-2 mt-1"
                        checked={url === mainImage}
                        onChange={() => setMainImage(url)}
                      ></input>
                    </div>
                    <img className={style.img} src={url}></img>
                    <Button
                      variant="dark"
                      className={style.button}
                      onClick={() => handleImageDelete(name)}
                    >
                      Törlés
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className={style.buttonContainer}>
              <Button type="submit" variant="dark">
                Mehet
              </Button>
            </div>
          </Form>
        )}
      </div>
    </>
  );
}
