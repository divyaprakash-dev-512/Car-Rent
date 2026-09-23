import React, { useState } from "react";
import AdminBrand from "./AdminBrand";
import AdminPostVehicle from "./AdminPostVehicle";

export default function AdminPanel() {
  const [brands, setBrands] = useState([]); 

  return (
    <>
      <AdminBrand brands={brands} setBrands={setBrands} />
      <AdminPostVehicle brands={brands} />
    </>
  );
}