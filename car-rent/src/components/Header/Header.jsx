import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

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
              <h1 className="display-3 fw-bold text-white">
                Kriszt Dániel
                <br />
                Autóbérlés
              </h1>
            </div>
          </div>
        </div>
        <div
          className={
            scroll ? "" : `rounded-bottom-4 ${styles.navbar_container}`
          }
        >
          <ul
            className={
              scroll
                ? `nav nav-pills justify-content-center`
                : `nav nav-pills ${styles.nav_bar}`
            }
          >
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Főoldal
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cars"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Autók
              </NavLink>
            </li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Kapcsolat
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
