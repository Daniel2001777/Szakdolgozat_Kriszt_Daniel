import { React, useState, useEffect } from "react";
import styles from "./Header.module.css";
import Nav from "./Nav";

const Header = () => {
  const [scroll, setScroll] = useState(320);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY < 320);
    });
  }, []);

  return (
    <>
      <div
        className={`py-4 bg-dark hero-header mb-5 rounded-bottom-4 bg-image ${styles.overlay_img}`}
      >
        <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-3 text-light" style={{
                fontFamily: '"Black Ops One", system-ui',
                fontWeight: "400 !important",
                fontStyle: "normal !important",
              }}>
                Kriszt Dániel
                <br />
                Autóbérlés
              </h1>
            </div>
          </div>
        </div>
        <div
          className={
            scroll
              ? `${styles.bold}`
              : `rounded-bottom-4 ${styles.navbar_container} ${styles.bold}`
          }
        >
          <ul
            className={
              scroll
                ? `nav nav-pills justify-content-center`
                : `nav nav-pills ${styles.nav_bar}`
            }
          >
            <Nav href="/home" title="Főoldal" />
            <Nav href="/cars" title="Autók" />
            <Nav href="/contact" title="Kapcsolat" />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
