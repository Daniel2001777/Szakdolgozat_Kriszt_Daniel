import React from "react";
import style from "./Contact.module.css";
import { FaMobile } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

export default function Contact() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.infContainer}>
          <h1>Keress fel minket:</h1>
          <div className={style.info}>
            <p className="mb-4">
              <a className={style.link} href="tel:+36704134681">
                <FaMobile className="me-2" />
                Telefonszám: +36704134681
              </a>
            </p>
            <p className="mb-4">
              <a className={style.link} href="mailto:krisztd@gmail.com">
                <IoIosMail className="me-2 fs-5" />
                Email: krisztd@gmail.com
              </a>
            </p>
            <p className="mb-4">
              <a
                className={style.link}
                href="https://maps.app.goo.gl/ASfLSF62zLqgWZjt9"
                target="_blank"
              >
                <FaHouse className="me-2" />
                Cím: 4025, Debrecen, Ispotály utca, 22
              </a>
            </p>
          </div>
          <div className={style.social}>
            <a
              href="https://www.facebook.com/profile.php?id=100094007367967"
              target="_blank"
              className={`me-4 ${style.link}`}
            >
              <FaFacebook />
            </a>
            <a href="" className={`me-4 ${style.link}`}>
              <FaGoogle />
            </a>
          </div>
        </div>
        <div className={style.mapContainer}>
          <iframe
            title="Address"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1347.2377147761702!2d21.619824686371864!3d47.51960629673798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47470e6b755eba3f%3A0x3a489c9ca226419b!2sDebrecen%2C%20Sal%C3%A9trom%20u.%2050%2C%204025!5e0!3m2!1shu!2shu!4v1712585727091!5m2!1shu!2shu"
            width="100%"
            height="450"
            style={{
              border: "1px solid grey",
              borderRadius: "0 1rem 1rem 0",
            }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
