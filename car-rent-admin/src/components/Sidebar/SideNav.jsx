import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.css";

export default function SideNav(props) {
  return (
    <li className="nav-item">
      <NavLink
        to={props.href}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        {props.title}
      </NavLink>
    </li>
  );
}
