import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Data from "../pages/Data/Data";
import AddCar from "../pages/AddCar/AddCar";
import NoPage from "../pages/NoPage/NoPage";
import ModifyCar from "../pages/ModifyCar/ModifyCar";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/data" />} />
      <Route path="/data" element={<Data />} />
      <Route path="/addcar" element={<AddCar />} />
      <Route path="/modifycar" element={<ModifyCar />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}
