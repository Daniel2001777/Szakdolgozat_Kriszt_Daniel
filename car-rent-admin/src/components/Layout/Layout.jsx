import React from "react";
import Routers from "../../routers/Routers";
import Sidebar from "../Sidebar/Sidebar";
import style from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <div className={`${style.wrapper}`}>
        <div className={`${style.sidebar}`}>
          <Sidebar />
        </div>
        <div className={style.workarea}>
          <Routers />
        </div>
      </div>
    </>
  );
}
