import React, { useEffect, useState } from "react";
import styles from "./AddCar.module.css";
import { Form, Button } from "react-bootstrap";
import axios from "../../axios/axiosInstance.js";
import { storage } from "../../firebase/firebase.js";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import slugify from "react-slugify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../ckEditor.css";

export default function AddCar() {
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [cardDescription, setCardDescription] = useState(
    localStorage.getItem("cardDescription") || ""
  );
  const [description, setDescription] = useState(
    localStorage.getItem("description") || ""
  );
  const [deposit, setDeposit] = useState(localStorage.getItem("deposit") || "");
  const [price, setPrice] = useState(localStorage.getItem("price") || "");
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});
  const [mainImage, setMainImage] = useState( localStorage.getItem("mainImage") || "");

  const convertedTitle = slugify(title);
  console.log(mainImage);

  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem("cardDescription", cardDescription);
  }, [cardDescription]);

  useEffect(() => {
    localStorage.setItem("description", description);
  }, [description]);

  useEffect(() => {
    localStorage.setItem("price", price);
  }, [price]);

  useEffect(() => {
    localStorage.setItem("deposit", deposit);
  }, [deposit]);

  useEffect(() => {
    localStorage.setItem("mainImage", mainImage);
  }, [mainImage]);

  const updatedListRef = ref(storage, `${convertedTitle}`);

  const listPictures = async () => {
    await listAll(updatedListRef).then((response) => {
      response.items.forEach((item) => {
        const name = item.name;
        getDownloadURL(item).then((url) => {
          setUploadedImages((prev) => ({ ...prev, [name]: url }));
        });
      });
    });
  };

  useEffect(() => {
    if (images == []) return;

    const uploadImages = async () => {
      for (let i = 0; i < images.length; i++) {
        const imageRef = ref(
          storage,
          `${convertedTitle}/${convertedTitle + v4()}`
        );
        await uploadBytes(imageRef, images[i]);
      }
      listPictures();
    };
    uploadImages();
  }, [images]);

  const handleImageDelete = async (name) => {
    const desertRef = ref(storage, `${convertedTitle}/${name}`);
    await deleteObject(desertRef)
      .then(() => {
        alert("A kép sikeresen törölve!");
        const updatedImages = Object.fromEntries(
          Object.entries(uploadedImages).filter(([key]) => key !== name)
        );
        setUploadedImages(updatedImages);
        setMainImage("");
      })
      .catch((err) => {
        alert("A képet nem siketült törölni!", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const carData = {
        title,
        cardDescription,
        description,
        price,
        deposit,
        convertedTitle,
        mainImage,
      };
      const response = await axios.post("/saveCarData", carData);
      if (response.status === 200) {
        console.log("Az adatok sikeresen elmentve!");
        alert("Az adatok sikeresen elmentve!");
        setTitle("");
        setCardDescription("");
        setDescription("");
        setDeposit("");
        setPrice("");
        setImages([]);
        setUploadedImages({});
        setMainImage("");
        localStorage.clear();
      } else {
        console.error("Nem sikerült elmenteni az adatokat!", response.data);
      }
    } catch (err) {
      console.error("A hiba: ", err);
    }
  };

  const handleFirstImage = (url) => {
    if (mainImage === "") {
      setMainImage(url);
      return true;
    } else {
      return url === mainImage;
    }
  };

  return (
    <>
      <Form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.left}>
          <Form.Group>
            <Form.Label className="control-label">Cím</Form.Label>
            <Form.Control
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={Object.entries(uploadedImages).length > 0}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="control-label">Kártya leírás</Form.Label>
            <Form.Control
              as="textarea"
              className={styles.textAreaCard}
              value={cardDescription}
              onChange={(event) => setCardDescription(event.target.value)}
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
        <div className={styles.right}>
          <Form.Group>
            <Form.Label className="control-label">
              Fényképek feltöltése
            </Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(event) => {
                setImages(Array.from(event.target.files));
                alert("A képek töltődnek!");
              }}
              disabled={title.length < 5}
            ></Form.Control>
          </Form.Group>
          <Form.Label className="control-label">Leírás</Form.Label>
          <div className={styles.textAreaDescription}>
            <CKEditor
              className={styles.textAreaDescription}
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
        <div className={styles.imagesContainer}>
          {Object.entries(uploadedImages).map(([name, url], index) => {
            return (
              <div key={name} className={styles.imgContainer}>
                <div className={styles.check}>
                  Címlap:
                  {index === 0 ? (
                    <input
                      type="checkbox"
                      className="ms-2 mt-1"
                      checked={handleFirstImage(url)}
                      onChange={() => setMainImage(url)}
                    ></input>
                  ) : (
                    <input
                      type="checkbox"
                      className="ms-2 mt-1"
                      checked={url === mainImage}
                      onChange={() => setMainImage(url)}
                    ></input>
                  )}
                </div>
                <img className={styles.img} src={url}></img>
                <Button
                  variant="dark"
                  className={styles.button}
                  onClick={() => handleImageDelete(name)}
                >
                  Törlés
                </Button>
              </div>
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <Button type="submit" variant="dark" disabled={!description}>
            Mehet
          </Button>
        </div>
      </Form>
    </>
  );
}
