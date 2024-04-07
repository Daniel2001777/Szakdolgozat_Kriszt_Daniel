import React from "react";
import style from "./Sidebar.module.css";
import { FaCarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SideNav from "./SideNav";

export default function Sidebar() {
  return (
    <div className={style.sidebar}>
      <NavLink to="/" className={style.colHeader}>
        <FaCarAlt className={style.hicon} />
        <div className={style.htitle}>Admin</div>
      </NavLink>
      <ul className={`nav nav-pills justify-content-center ${style.navs}`}>
        <SideNav href="/data" title="Bérlések listála"/>
        <SideNav href="/addcar" title="Autó hozzáadása" />
        <SideNav href="/modifycar" title="Autó módosítása" />
      </ul>
    </div>
  );
}
