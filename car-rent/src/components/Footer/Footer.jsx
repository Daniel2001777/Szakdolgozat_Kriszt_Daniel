import React from "react";
import { IoIosContact } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaMobile } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer
      className={`${styles.main} text-center text-lg-start text-light rounded-top-4`}
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Lépj kapcsolatba velünk a közösségi médián is:</span>
        </div>
        <div>
          <a
            href="https://www.facebook.com/profile.php?id=100094007367967"
            target="_blank"
            className={`me-4 ${styles.link}`}
          >
            <FaFacebook />
          </a>
          <a href="" className={`me-4 ${styles.link}`}>
            <FaGoogle />
          </a>
        </div>
      </section>
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FaCar className="me-2 fs-5" /> Kriszt Dániel autóbérlés
              </h6>
              <p>
                Az oldalon többféle autó közzül válszthatnak a kedves bérlők,
                kedvező áron. Keressen fel minket a megadott elérhetőségeken,
                vagy böngésszen az oldalon a megfelelő választáshoz.
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <IoIosContact className="me-2 fs-4" /> Kapcsolat
              </h6>
              <p>
                <a href="mailto:krisztd@gmail.com" className={styles.link}>
                  <IoIosMail className="me-3 fs-5" />
                  krisztd@gmail.com
                </a>
              </p>
              <p>
                <a className={styles.link} href="tel:+36704134681">
                  <FaMobile className="me-3" />+ 36 70 413 4681
                </a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MdEventAvailable className="me-2 fs-5" /> Elérhetőség
              </h6>
              <p>
                <a
                  className={styles.link}
                  href="https://maps.app.goo.gl/ASfLSF62zLqgWZjt9"
                  target="_blank"
                >
                  <FaHouse className="me-2" /> 4025, Debrecen, Ispotály utca, 22
                </a>
              </p>
              <p>
                <FaClock className="me-2" /> Hétfő - Péntek:{" "}
                <span className={styles.clock}>
                  10<sup>00</sup> - 18<sup>00</sup>
                </span>
              </p>
              <p>
                <FaClock className="me-2" /> Szombat:{" "}
                <span className={styles.clock}>
                  10<sup>00</sup> - 14<sup>00</sup>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="d-flex justify-content-center p-4">
        <a href="/home" className={`${styles.link} p-2`}>
          Főoldal
        </a>
        <a href="/cars" className={`${styles.link} p-2`}>
          Autók
        </a>
        <a href="/contact" className={`${styles.link} p-2`}>
          Kapcsolat
        </a>
      </section>
    </footer>
  );
}
