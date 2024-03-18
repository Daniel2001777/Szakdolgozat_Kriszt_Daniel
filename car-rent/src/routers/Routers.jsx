import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Cars from "../pages/Cars";
import CarDetails from "../pages/CarDetails";
import NoPage from "../pages/NoPage";
import Contact from "../pages/Contact";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  )
}